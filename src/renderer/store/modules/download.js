import download from '../../utils/download'
import fs from 'fs'
import path from 'path'
import music from '../../utils/music'
import { getMusicType } from '../../utils/music/utils'
import {
  setMeta,
  saveLrc,
  getLyric as getLyricFromStorage,
  setLyric,
  getMusicUrl as getMusicUrlFormStorage,
  setMusicUrl,
  assertApiSupport,
} from '../../utils'

/** @type { LxMusic.Renderer.DownloadStatusState } */
const state = {
  list: [],
  waitingList: [],
  downloadStatus: {
    RUN: 'run',
    WAITING: 'waiting',
    PAUSE: 'pause',
    ERROR: 'error',
    COMPLETED: 'completed',
  },
}

/** @type { LxMusic.Renderer.DownloadMap } */ const dls = {}
/** @type { LxMusic.Renderer.DownloadTryMap } */ const tryNum = {}
/** 正在运行操作任务 */ let isRuningActionTask = false

const filterFileName = /[\\/:*?#"<>|]/g

// getters
const getters = {
  /** @param { LxMusic.Renderer.DownloadStatusState } state */
  list: state => state.list || [],

  /** @param { LxMusic.Renderer.DownloadStatusState } state */
  downloadStatus: state => state.downloadStatus,
}

/**
 * 判断路径存在
 * @param { string } path
 * @returns { Promise<void> }
 */
const checkPath = path => new Promise((resolve, reject) => {
  fs.access(path, fs.constants.F_OK | fs.constants.W_OK, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.mkdir(path, { recursive: true }, err => {
          if (err) return reject(err)
          resolve()
        })
        return
      }
      return reject(err)
    }
    resolve()
  })
})

/** @param { LxMusic.Renderer.MusicQualityType } type */
const getExt = type => {
  switch (type) {
    case '128k':
    case '192k':
    case '320k':
      return 'mp3'
    case 'ape':
      return 'ape'
    case 'flac':
      return 'flac'
    case 'wav':
      return 'wav'
  }
}

/**
 * 检查列表
 * @param { LxMusic.Renderer.DownloadInfo[] } list 歌曲列表
 * @param { LxMusic.UserApiEvent.SongInfo } musicInfo 歌曲信息
 * @param { LxMusic.Renderer.MusicQualityType } type 音质类型
 * @param { LxMusic.Renderer.MusicQualityExtType } ext 音质提取类型
 */
const checkList = (list, musicInfo, type, ext) => list.some(s => s.musicInfo.songmid === musicInfo.songmid && (s.type === type || s.ext === ext))

/**
 * 取开始任务
 * @param { LxMusic.Renderer.DownloadInfo[] } list 列表
 * @param { LxMusic.Renderer.DownloadStatusInfo } downloadStatus 下载状态
 * @param { number } maxDownloadNum 最大下载数
 */
const getStartTask = (list, downloadStatus, maxDownloadNum) => {
  let downloadCount = 0
  const waitList = list.filter(item => item.status == downloadStatus.WAITING ? true : (item.status === downloadStatus.RUN && ++downloadCount && false))
  // console.log(downloadCount, waitList)
  return downloadCount < maxDownloadNum ? waitList.shift() || null : false
}

/**
 * 等待请求动画帧
 * @returns { Promise<void> }
 */
const awaitRequestAnimationFrame = () => new Promise(resolve => window.requestAnimationFrame(() => resolve()))

/**
 * 添加任务
 * @param { LxMusic.Renderer.DownloadStatusActionContext } store 存储器
 * @param { LxMusic.UserApiEvent.SongInfo[] } list 列表
 * @param { LxMusic.Renderer.MusicQualityType } type 类型
 */
const addTasks = async(store, list, type) => {
  if (list.length == 0) return
  let num = 3
  while (num-- > 0) {
    let item = list.shift()
    if (!item) return
    store.dispatch('createDownload', {
      musicInfo: item,
      type: getMusicType(item, type),
    })
  }
  await awaitRequestAnimationFrame()
  await addTasks(store, list, type)
}

/**
 * 移除任务
 * @param { LxMusic.Renderer.DownloadStatusActionContext } store 存储器
 * @param { LxMusic.Renderer.DownloadInfo[] } list 列表
 */
const removeTasks = async(store, list) => {
  let num = 20
  while (num-- > 0) {
    let item = list.pop()
    if (!item) return
    let index = store.state.list.indexOf(item)
    if (index < 0) continue
    store.dispatch('removeTask', item)
  }
  await awaitRequestAnimationFrame()
  await removeTasks(store, list)
}

/**
 * 开始任务
 * @param { LxMusic.Renderer.DownloadStatusActionContext } store 存储器
 * @param { LxMusic.Renderer.DownloadInfo[] } list 列表
 */
const startTasks = async(store, list) => {
  let num = 5
  while (num-- > 0) {
    let item = list.shift()
    if (!item) return
    if (item.isComplate || item.status == state.downloadStatus.RUN || item.status == state.downloadStatus.WAITING) continue
    let index = store.state.list.indexOf(item)
    if (index < 0) continue
    store.dispatch('startTask', item)
  }
  await awaitRequestAnimationFrame()
  await startTasks(store, list)
}

/**
 * 暂停任务
 * @param { LxMusic.Renderer.DownloadStatusActionContext } store 存储器
 * @param { LxMusic.Renderer.DownloadInfo[] } list 列表
 * @param { LxMusic.Renderer.DownloadInfo[] } runs 运行列表
 */
const pauseTasks = async(store, list, runs = []) => {
  let num = 6
  let index
  let stateList = store.state.list
  while (num-- > 0) {
    let item = list.shift()
    if (item) {
      if (item.isComplate) continue
      switch (item.status) {
        case state.downloadStatus.RUN:
          runs.push(item)
          continue
        case state.downloadStatus.WAITING:
          index = stateList.indexOf(item)
          if (index < 0) return
          store.dispatch('pauseTask', item)
          continue
        default:
          continue
      }
    } else {
      for (const item of runs) {
        index = stateList.indexOf(item)
        if (index < 0) return
        await store.dispatch('pauseTask', item)
      }
      return
    }
  }
  await awaitRequestAnimationFrame()
  await pauseTasks(store, list, runs)
}

/**
 * 处理获取音乐路径
 * @this LxMusic.Renderer.DownloadStatusActionContext
 * @param { LxMusic.Renderer.DownloadStatusActionContext } this 音乐信息
 * @param { LxMusic.UserApiEvent.SongInfo } musicInfo 音乐信息
 * @param { LxMusic.Renderer.MusicQualityType } type 音质类型
 * @param { LxMusic.UserApiEvent.SongInfo["source"][] } retryedSource 复述来源
 * @param { LxMusic.UserApiEvent.SongInfo } originMusic 来源音乐
 * @returns { Promise<LxMusic.Renderer.MusicPlatformMusicUrlInfo> }
 */
const handleGetMusicUrl = function(musicInfo, type, retryedSource = [], originMusic) {
  // console.log(musicInfo.source)
  if (!originMusic) originMusic = musicInfo
  let reqPromise
  try {
    reqPromise = music[musicInfo.source].getMusicUrl(musicInfo, type).promise
  } catch (err) {
    reqPromise = Promise.reject(err)
  }
  return reqPromise.catch(err => {
    if (!retryedSource.includes(musicInfo.source)) retryedSource.push(musicInfo.source)
    return this.dispatch('list/getOtherSource', originMusic).then(otherSource => {
      console.log('find otherSource', otherSource)
      if (otherSource.length) {
        for (const item of otherSource) {
          if (retryedSource.includes(item.source) || !assertApiSupport(item.source)) continue
          console.log('try toggle to: ', item.source, item.name, item.singer, item.interval)
          return handleGetMusicUrl.call(this, item, type, retryedSource, originMusic)
        }
      }
      return Promise.reject(err)
    })
  })
}

/**
 * 取音乐路径
 * @this LxMusic.Renderer.DownloadStatusActionContext
 * @param { LxMusic.Renderer.DownloadInfo } downloadInfo 下载信息
 * @param { boolean } isUseOtherSource 使用的其他来源
 * @param { boolean } isRefresh 要刷新
 * @returns { Promise<string> }
 */
const getMusicUrl = async function(downloadInfo, isUseOtherSource, isRefresh) {
  const cachedUrl = await getMusicUrlFormStorage(downloadInfo.musicInfo, downloadInfo.type)
  if (!downloadInfo.musicInfo._types[downloadInfo.type]) {
    // 兼容旧版酷我源搜索列表过滤128k音质的bug
    if (!(downloadInfo.musicInfo.source == 'kw' && downloadInfo.type == '128k')) throw new Error('该歌曲没有可下载的音频')

    // return Promise.reject(new Error('该歌曲没有可下载的音频'))
  }
  return cachedUrl && !isRefresh
    ? cachedUrl
    : (
      isUseOtherSource
        ? handleGetMusicUrl.call(this, downloadInfo.musicInfo, downloadInfo.type)
        : music[downloadInfo.musicInfo.source].getMusicUrl(downloadInfo.musicInfo, downloadInfo.type).promise
    ).then(({ url }) => {
      setMusicUrl(downloadInfo.musicInfo, downloadInfo.type, url)
      return url
    })
}

/**
 * 获取图片
 * @this LxMusic.Renderer.DownloadStatusActionContext
 * @param { LxMusic.UserApiEvent.SongInfo } musicInfo 音乐信息
 * @param { LxMusic.UserApiEvent.SongInfo["source"][] } retryedSource 复述来源
 * @param { LxMusic.UserApiEvent.SongInfo } originMusic 来源音乐
 * @returns { Promise<string> }
 */
const getPic = function(musicInfo, retryedSource = [], originMusic) {
  // console.log(musicInfo.source)
  if (!originMusic) originMusic = musicInfo
  /** @type { Promise<never> } */ let reqPromise
  try {
    reqPromise = music[musicInfo.source].getPic(musicInfo).promise
  } catch (err) {
    reqPromise = Promise.reject(err)
  }
  return reqPromise.catch(err => {
    if (!retryedSource.includes(musicInfo.source)) retryedSource.push(musicInfo.source)
    return this.dispatch('list/getOtherSource', originMusic).then(otherSource => {
      console.log('find otherSource', otherSource)
      if (otherSource.length) {
        for (const item of otherSource) {
          if (retryedSource.includes(item.source)) continue
          console.log('try toggle to: ', item.source, item.name, item.singer, item.interval)
          return getPic.call(this, item, retryedSource, originMusic)
        }
      }
      return Promise.reject(err)
    })
  })
}

/**
 * 获取歌词
 * @this LxMusic.Renderer.DownloadStatusActionContext
 * @param { LxMusic.UserApiEvent.SongInfo } musicInfo 音乐信息
 * @param { LxMusic.UserApiEvent.SongInfo["source"][] } retryedSource 复述来源
 * @param { LxMusic.UserApiEvent.SongInfo } originMusic 来源音乐
 * @returns { Promise<LxMusic.Renderer.MusicPlatformLyricInfo> }
 */
const getLyric = function(musicInfo, retryedSource = [], originMusic) {
  if (!originMusic) originMusic = musicInfo
  /** @type { Promise<never> } */ let reqPromise
  try {
    reqPromise = music[musicInfo.source].getLyric(musicInfo).promise
  } catch (err) {
    reqPromise = Promise.reject(err)
  }
  return reqPromise.catch(err => {
    if (!retryedSource.includes(musicInfo.source)) retryedSource.push(musicInfo.source)
    return this.dispatch('list/getOtherSource', originMusic).then(otherSource => {
      console.log('find otherSource', otherSource)
      if (otherSource.length) {
        for (const item of otherSource) {
          if (retryedSource.includes(item.source)) continue
          console.log('try toggle to: ', item.source, item.name, item.singer, item.interval)
          return getLyric.call(this, item, retryedSource, originMusic)
        }
      }
      return Promise.reject(err)
    })
  })
}

// 修复 1.1.x版本 酷狗源歌词格式
/**
 * 修复KG歌词
 * @param { string } lrc 歌词
 */
const fixKgLyric = lrc => /\[00:\d\d:\d\d.\d+\]/.test(lrc) ? lrc.replace(/(?:\[00:(\d\d:\d\d.\d+\]))/gm, '[$1') : lrc

/**
 * 设置歌曲元信息
 * @this LxMusic.Renderer.DownloadStatusActionContext
 * @param { LxMusic.Renderer.DownloadInfo } downloadInfo 下载信息
 * @param { string } filePath 文件路径
 * @param { boolean } isUseOtherSource 使用的其他来源
 * @param { boolean } isEmbedPic 是否嵌入图片
 * @param { boolean } isEmbedLyric
 */
const saveMeta = function(downloadInfo, filePath, isUseOtherSource, isEmbedPic, isEmbedLyric) {
  if (downloadInfo.type === 'ape') return
  const tasks = [
    isEmbedPic
      ? downloadInfo.musicInfo.img
        ? Promise.resolve(downloadInfo.musicInfo.img)
        : (
          isUseOtherSource
            ? getPic.call(this, downloadInfo.musicInfo)
            : music[downloadInfo.musicInfo.source].getPic(downloadInfo.musicInfo).promise
        ).catch(err => {
          console.log(err)
          return null
        })
      : Promise.resolve(),
    isEmbedLyric
      ? getLyricFromStorage(downloadInfo.musicInfo).then(lrcInfo => {
        return lrcInfo.lyric
          ? Promise.resolve({ lyric: lrcInfo.lyric, tlyric: lrcInfo.tlyric || '' })
          : (
            isUseOtherSource
              ? getLyric.call(this, downloadInfo.musicInfo)
              : music[downloadInfo.musicInfo.source].getLyric(downloadInfo.musicInfo).promise
          ).then(({ lyric, tlyric, lxlyric }) => {
            setLyric(downloadInfo.musicInfo, { lyric, tlyric, lxlyric })
            return { lyric, tlyric, lxlyric }
          }).catch(err => {
            console.log(err)
            return null
          })
      })
      : Promise.resolve(),
  ]
  Promise.all(tasks).then(([imgUrl, lyrics = {}]) => {
    if (lyrics.lyric) lyrics.lyric = fixKgLyric(lyrics.lyric)
    setMeta(filePath, {
      title: downloadInfo.musicInfo.name,
      artist: downloadInfo.musicInfo.singer,
      album: downloadInfo.musicInfo.albumName,
      APIC: imgUrl,
      lyrics: lyrics.lyric,
    })
  })
}

/**
 * 下载歌词
 * @param { LxMusic.Renderer.DownloadInfo } downloadInfo 下载信息
 * @param { string } filePath 文件路径
 */
const downloadLyric = (downloadInfo, filePath) => {
  const promise = getLyric(downloadInfo.musicInfo).then(lrcInfo => {
    return lrcInfo.lyric
      ? Promise.resolve({ lyric: lrcInfo.lyric, tlyric: lrcInfo.tlyric || '' })
      : music[downloadInfo.musicInfo.source].getLyric(downloadInfo.musicInfo).promise.then(({ lyric, tlyric, lxlyric }) => {
        setLyric(downloadInfo.musicInfo, { lyric, tlyric, lxlyric })
        return { lyric, tlyric, lxlyric }
      })
  })
  promise.then(lrcs => {
    if (lrcs.lyric) {
      lrcs.lyric = fixKgLyric(lrcs.lyric)
      saveLrc(filePath.replace(/(mp3|flac|ape|wav)$/, 'lrc'), lrcs.lyric)
    }
  })
}

/**
 * 刷新网址
 * @this LxMusic.Renderer.DownloadStatusActionContext
 * @param { LxMusic.Renderer.DownloadStatusActionContext["commit"] } commit
 * @param { LxMusic.Renderer.DownloadInfo } downloadInfo 下载信息
 * @param { boolean } isUseOtherSource 使用的其他来源
 */
const refreshUrl = function(commit, downloadInfo, isUseOtherSource) {
  commit('setStatusText', { downloadInfo, text: '链接失效，正在刷新链接' })
  getMusicUrl.call(this, downloadInfo, isUseOtherSource, true).then(url => {
    commit('updateUrl', { downloadInfo, url })
    commit('setStatusText', { downloadInfo, text: '链接刷新成功' })
    const dl = dls[downloadInfo.key]
    if (!dl) return
    dl.refreshUrl(url)
    dl.start().catch(err => {
      commit('onError', { downloadInfo, errorMsg: err.message })
      commit('setStatusText', { downloadInfo, text: err.message })
      this.dispatch('download/startTask')
    })
  }).catch(err => {
    // console.log(err)
    commit('onError', { downloadInfo, errorMsg: err.message })
    commit('setStatusText', { downloadInfo, text: err.message })
    this.dispatch('download/startTask')
  })
}

/**
 * 删除文件
 * @param { string } path 被删除路径
 * @returns { Promise<void> }
 */
const deleteFile = path => new Promise((resolve, reject) => {
  fs.access(path, fs.constants.F_OK, err => {
    if (err) return reject(err)
    fs.unlink(path, err => {
      if (err) return reject(err)
      resolve()
    })
  })
})


/** 行动 */
const actions = {
  /**
   * 创建下载
   * @param { LxMusic.Renderer.DownloadStatusActionContext } param0
   * @param { LxMusic.Renderer.DownloadMusicInfo } param1
   */
  async createDownload({ state, rootState, commit, dispatch }, { musicInfo, type }) {
    let ext = getExt(type)
    if (checkList(state.list, musicInfo, type, ext)) return
    /** @type { LxMusic.Renderer.DownloadInfo } */
    const downloadInfo = {
      isComplate: false,
      status: state.downloadStatus.WAITING,
      statusText: '待下载',
      url: null,
      fileName: `${rootState.setting.download.fileName
        .replace('歌名', musicInfo.name)
        .replace('歌手', musicInfo.singer)}.${ext}`.replace(filterFileName, ''),
      progress: {
        downloaded: 0,
        total: 0,
        progress: 0,
      },
      type,
      ext,
      musicInfo,
      key: `${musicInfo.songmid}${ext}`,
    }
    downloadInfo.filePath = path.join(rootState.setting.download.savePath, downloadInfo.fileName)
    commit('addTask', downloadInfo)
    try { // 删除同路径下的同名文件
      await deleteFile(downloadInfo.filePath)
    } catch (err) {
      if (err.code !== 'ENOENT') return commit('setStatusText', { downloadInfo, text: '文件删除失败' })
    }
    if (dls[downloadInfo.key]) {
      dls[downloadInfo.key].stop().finally(() => {
        delete dls[downloadInfo.key]
        dispatch('startTask', downloadInfo)
      })
    } else {
      // console.log(downloadInfo)
      dispatch('startTask', downloadInfo)
    }
  },

  /**
   * 创建多下载
   * @param { LxMusic.Renderer.DownloadStatusActionContext } store 存储器
   * @param { LxMusic.Renderer.DownloadMusicListInfo } param1
   */
  createDownloadMultiple(store, { list, type }) {
    if (!list.length || isRuningActionTask) return
    isRuningActionTask = true
    return addTasks(store, [...list], type).finally(() => {
      isRuningActionTask = false
    })
  },

  /**
   * 处理开始任务
   * @this LxMusic.Renderer.DownloadStatusActionContext
   * @param { LxMusic.Renderer.DownloadStatusActionContext } param0
   * @param { LxMusic.Renderer.DownloadInfo } downloadInfo 下载信息
   * @returns
   */
  async handleStartTask({ commit, dispatch, rootState }, downloadInfo) {
    // 开始任务
    commit('onStart', downloadInfo)
    commit('setStatusText', { downloadInfo, text: '任务初始化中' })
    try {
      await checkPath(rootState.setting.download.savePath)
    } catch (error) {
      commit('onError', { downloadInfo, errorMsg: error.message })
      commit('setStatusText', '检查下载目录出错: ' + error.message)
      await dispatch('startTask')
      return
    }
    const _this = this
    /**
     * 下载歌词参数
     * @type { LxMusic.Renderer.DownloadOptionInfo }
     */
    const options = {
      url: downloadInfo.url,
      path: rootState.setting.download.savePath,
      fileName: downloadInfo.fileName,
      method: 'get',
      override: true,
      onCompleted() {
        // if (downloadInfo.progress.progress != '100.00') {
        //   delete dls[downloadInfo.key]
        //   return dispatch('startTask', downloadInfo)
        // }
        commit('onCompleted', downloadInfo)
        dispatch('startTask')

        saveMeta.call(_this, downloadInfo, downloadInfo.filePath, rootState.setting.download.isUseOtherSource, rootState.setting.download.isEmbedPic, rootState.setting.download.isEmbedLyric)
        if (rootState.setting.download.isDownloadLrc) downloadLyric(downloadInfo, downloadInfo.filePath)
        console.log('on complate')
      },
      onError(err) {
        // console.log(err)
        if (err.code == 'EPERM') {
          commit('onError', { downloadInfo, errorMsg: '歌曲下载目录没有写入权限，请尝试更改歌曲保存路径' })
          return
        }
        // console.log(tryNum[downloadInfo.key])
        if (++tryNum[downloadInfo.key] > 2) {
          commit('onError', { downloadInfo, errorMsg: err.message })
          dispatch('startTask')
          return
        }
        if (err.code == 'ENOTFOUND') {
          commit('onError', { downloadInfo, errorMsg: '链接失效' })
          refreshUrl.call(_this, commit, downloadInfo, rootState.setting.download.isUseOtherSource)
        } else {
          console.log('Download failed, Attempting Retry')
          dls[downloadInfo.key].start()
          commit('setStatusText', { downloadInfo, text: '正在重试' })
        }
      },
      onFail(response) {
        if (++tryNum[downloadInfo.key] > 2) {
          commit('onError', { downloadInfo, errorMsg: '下载失败' })
          dispatch('startTask')
          return
        }
        switch (response.statusCode) {
          case 401:
          case 403:
          case 410:
            commit('onError', { downloadInfo, errorMsg: '链接失效' })
            refreshUrl.call(_this, commit, downloadInfo, rootState.setting.download.isUseOtherSource)
            break
          default:
            dls[downloadInfo.key].start()
            commit('setStatusText', { downloadInfo, text: '正在重试' })
            break
        }
      },
      onStart() {
        commit('onStart', downloadInfo)
        console.log('on start')
      },
      onProgress(status) {
        commit('onProgress', { downloadInfo, status })
        console.log(status)
      },
      onStop() {
        commit('pauseTask', downloadInfo)
        dispatch('startTask')
      },
    }
    commit('setStatusText', { downloadInfo, text: '获取URL中...' })
    let p = options.url
      ? Promise.resolve()
      : getMusicUrl.call(this, downloadInfo, rootState.setting.download.isUseOtherSource).then(url => {
        commit('updateUrl', { downloadInfo, url })
        if (!url) return Promise.reject(new Error('获取URL失败'))
        options.url = url
      })
    p.then(() => {
      tryNum[downloadInfo.key] = 0
      dls[downloadInfo.key] = download(options)
    }).catch(err => {
      // console.log(err.message)
      commit('onError', { downloadInfo, errorMsg: err.message })
      commit('setStatusText', { downloadInfo, text: err.message })
      dispatch('startTask')
    })
  },

  /**
   * 移除任务
   * @param { LxMusic.Renderer.DownloadStatusActionContext } param0
   * @param { LxMusic.Renderer.DownloadInfo } item
   */
  async removeTask({ commit, state, dispatch }, item) {
    if (dls[item.key]) {
      if (item.status == state.downloadStatus.RUN) {
        try {
          await dls[item.key].stop()
        } catch (_) {}
      }
      delete dls[item.key]
    }
    commit('removeTask', item)
    if (item.status != state.downloadStatus.COMPLETED) {
      try {
        await deleteFile(item.filePath)
      } catch (_) {}
    }
    switch (item.status) {
      case state.downloadStatus.RUN:
      case state.downloadStatus.WAITING:
        await dispatch('startTask')
    }
  },

  /**
   * 移除任务
   * @param { LxMusic.Renderer.DownloadStatusActionContext } store 储存桶
   * @param { LxMusic.Renderer.DownloadInfo[] } list 下载列表
   */
  removeTasks(store, list) {
    let { rootState, state } = store
    if (isRuningActionTask) return
    isRuningActionTask = true
    return removeTasks(store, [...list]).finally(() => {
      let result = getStartTask(state.list, state.downloadStatus, rootState.setting.download.maxDownloadNum)
      while (result) {
        store.dispatch('startTask', result)
        result = getStartTask(state.list, state.downloadStatus, rootState.setting.download.maxDownloadNum)
      }
      isRuningActionTask = false
    })
  },

  /**
   * 开始任务
   * @param { LxMusic.Renderer.DownloadStatusActionContext } param0 储存桶
   * @param { LxMusic.Renderer.DownloadInfo } downloadInfo 下载信息
   */
  async startTask({ state, rootState, commit, dispatch }, downloadInfo) {
    // 检查是否可以开始任务
    let result = getStartTask(state.list, state.downloadStatus, rootState.setting.download.maxDownloadNum)
    if (downloadInfo && !downloadInfo.isComplate && downloadInfo.status != state.downloadStatus.RUN) {
      if (result === false) {
        commit('setStatus', { downloadInfo, status: state.downloadStatus.WAITING })
        return
      }
    } else {
      if (!result) return
      downloadInfo = result
    }

    let dl = dls[downloadInfo.key]
    if (dl) {
      commit('updateFilePath', {
        downloadInfo,
        filePath: path.join(rootState.setting.download.savePath, downloadInfo.fileName),
      })
      dl.updateSaveInfo(rootState.setting.download.savePath, downloadInfo.fileName)
      try {
        await dl.start()
      } catch (error) {
        commit('onError', { downloadInfo, errorMsg: error.message })
        commit('setStatusText', error.message)
        await dispatch('startTask')
      }
    } else {
      await dispatch('handleStartTask', downloadInfo)
    }
  },

  /**
   * 开始任务列表
   * @param { LxMusic.Renderer.DownloadStatusActionContext } store 储存桶
   * @param { LxMusic.Renderer.DownloadInfo[] } list 下载列表
   */
  startTasks(store, list) {
    if (isRuningActionTask) return
    isRuningActionTask = true
    return startTasks(store, list.filter(item => !(item.isComplate || item.status == state.downloadStatus.RUN || item.status == state.downloadStatus.WAITING))).finally(() => {
      isRuningActionTask = false
    })
  },

  /**
   * 暂停任务
   * @param { LxMusic.Renderer.DownloadStatusActionContext } store 储存桶
   * @param { LxMusic.Renderer.DownloadInfo } item 下载信息
   */
  async pauseTask(store, item) {
    if (item.isComplate) return
    let dl = dls[item.key]
    if (dl) {
      try {
        await dl.stop()
      } catch (_) {}
    }
    store.commit('pauseTask', item)
  },

  /**
   * 暂停任务列表
   * @param { LxMusic.Renderer.DownloadStatusActionContext } store 储存桶
   * @param { LxMusic.Renderer.DownloadInfo[] } list 下载列表
   */
  pauseTasks(store, list) {
    if (isRuningActionTask) return
    isRuningActionTask = true
    return pauseTasks(store, [...list]).finally(() => {
      isRuningActionTask = false
    })
  },
}

// mitations
const mutations = {
  /**
   * 添加任务
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadInfo } downloadInfo
   */
  addTask(state, downloadInfo) {
    state.list.unshift(downloadInfo)
  },
  /**
   * 移除任务
   * @param { LxMusic.Renderer.DownloadStatusState } param0
   * @param { LxMusic.Renderer.DownloadInfo } downloadInfo
   */
  removeTask({ list }, downloadInfo) {
    list.splice(list.indexOf(downloadInfo), 1)
  },
  /**
   * 暂停任务
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadInfo } downloadInfo
   */
  pauseTask(state, downloadInfo) {
    downloadInfo.status = state.downloadStatus.PAUSE
    downloadInfo.statusText = '暂停下载'
  },
  /**
   * 设置状态文本
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadSetStatusInfo } param1
   */
  setStatusText(state, { downloadInfo, index, text }) { // 设置状态文本
    if (downloadInfo) {
      downloadInfo.statusText = text
    } else {
      state.list[index].statusText = text
    }
  },
  /**
   * 设置状态
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadSetStatusInfo } param1
   */
  setStatus(state, { downloadInfo, index, status }) { // 设置状态及状态文本
    let text
    switch (status) {
      case state.downloadStatus.RUN:
        text = '正在下载'
        break
      case state.downloadStatus.WAITING:
        text = '等待下载'
        break
      case state.downloadStatus.PAUSE:
        text = '暂停下载'
        break
      case state.downloadStatus.ERROR:
        text = '任务出错'
        break
      case state.downloadStatus.COMPLETED:
        text = '下载完成'
        break
    }
    if (downloadInfo) {
      downloadInfo.statusText = text
      downloadInfo.status = status
    } else {
      state.list[index].statusText = text
      state.list[index].status = status
    }
  },
  /**
   * 若完成
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadInfo } downloadInfo
   */
  onCompleted(state, downloadInfo) {
    downloadInfo.isComplate = true
    downloadInfo.status = state.downloadStatus.COMPLETED
    downloadInfo.statusText = '下载完成'
  },
  /**
   * 若错误
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadSetStatusInfo } param1
   */
  onError(state, { downloadInfo, errorMsg }) {
    downloadInfo.status = state.downloadStatus.ERROR
    downloadInfo.statusText = errorMsg || '任务出错'
  },
  /**
   * 若开始
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadInfo } downloadInfo
   */
  onStart(state, downloadInfo) {
    downloadInfo.status = state.downloadStatus.RUN
    downloadInfo.statusText = '正在下载'
  },
  /**
   * 若进度
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadSetStatusInfo } param1
   */
  onProgress(state, { downloadInfo, status }) {
    downloadInfo.progress.progress = status.progress
    downloadInfo.progress.downloaded = status.downloaded
    downloadInfo.progress.total = status.total
  },
  /**
   * 设置总数
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadSetStatusInfo } param1
   */
  setTotal(state, { order, downloadInfo }) {
    downloadInfo.order = order
  },
  /**
   * 更新下载列表
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadInfo[] } list
   */
  updateDownloadList(state, list) {
    state.list = list
  },
  /**
   * 设置网址
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadSetStatusInfo } param1
   */
  updateUrl(state, { downloadInfo, url }) {
    downloadInfo.url = url
  },
  /**
   * 设置网址
   * @param { LxMusic.Renderer.DownloadStatusState } state
   * @param { LxMusic.Renderer.DownloadSetStatusInfo } param1
   */
  updateFilePath(state, { downloadInfo, filePath }) {
    if (downloadInfo.filePath === filePath) return
    downloadInfo.filePath = filePath
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
