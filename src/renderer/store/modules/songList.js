import music from '../../utils/music'
/** @type { LxMusic.Renderer.SortListSortMap } */ const sortList = {}
/** @type { LxMusic.Renderer.MusicSources } */ const sources = []
/** @type { LxMusic.Renderer.SongListCacheMap } */ const cache = new Map()
for (const source of music.sources) {
  const songList = music[source.id].songList
  if (!songList) continue
  sortList[source.id] = songList.sortList
  sources.push(source)
}

/**
 * 过滤列表
 * @param { LxMusic.UserApiEvent.SongInfo[] } list
 */
const filterList = list => {
  const keys = new Set()
  return list.filter(item => {
    if (keys.has(item.songmid)) return false
    keys.add(item.songmid)
    return true
  })
}

// state
/** @type { LxMusic.Renderer.SongListState } */
const state = {
  tags: {},
  list: {
    list: [],
    total: 0,
    page: 1,
    limit: 30,
    key: null,
  },
  listDetail: {
    list: [],
    desc: null,
    total: 0,
    page: 1,
    limit: 30,
    key: null,
    info: {},
  },
  selectListInfo: {},
  isVisibleListDetail: false,
}

sources.forEach(source => {
  state.tags[source.id] = null
})


// getters
const getters = {
  /** @param { LxMusic.Renderer.SongListState } state */ sourceInfo(state, getters, rootState, { sourceNames }) { return { sources: sources.map(item => ({ id: item.id, name: sourceNames[item.id] })), sortList } },
  /** @param { LxMusic.Renderer.SongListState } state */ tags: state => state.tags,
  /** @param { LxMusic.Renderer.SongListState } state */ isVisibleListDetail: state => state.isVisibleListDetail,
  /** @param { LxMusic.Renderer.SongListState } state */ selectListInfo: state => state.selectListInfo,
  /** @param { LxMusic.Renderer.SongListState } state */ listData(state) { return state.list },
  /** @param { LxMusic.Renderer.SongListState } state */ listDetail(state) { return state.listDetail },
}

// actions
const actions = {
  /**
   * 获取标签组
   * @param { LxMusic.Renderer.SongListActionContext } param0
   */
  getTags({ state, rootState, commit }) {
    let source = rootState.setting.songList.source
    return music[source].songList.getTags().then(result => commit('setTags', { tags: result, source }))
  },

  /**
   * 获取列表
   * @param { LxMusic.Renderer.SongListActionContext } param0
   * @param { number } page
   */
  getList({ state, rootState, commit }, page) {
    let source = rootState.setting.songList.source
    let tabId = rootState.setting.songList.tagInfo.id
    let sortId = rootState.setting.songList.sortId
    // console.log(sortId)
    let key = `slist__${source}__${sortId}__${tabId}__${page}`
    if (state.list.list.length && state.list.key == key) return
    if (cache.has(key)) return Promise.resolve(cache.get(key)).then(result => commit('setList', { result, key, page }))
    commit('clearList')
    return music[source].songList.getList(sortId, tabId, page).then(result => commit('setList', { result, key, page }))
  },

  /**
   * 取列表明细
   * @param { LxMusic.Renderer.SongListActionContext } param0
   * @param { LxMusic.Renderer.SongListGetDetailInfo } param1
   */
  getListDetail({ state, rootState, commit }, { id, page }) {
    let source = rootState.setting.songList.source
    let key = `sdetail__${source}__${id}__${page}`
    if (state.listDetail.list.length && state.listDetail.key == key) return Promise.resolve()
    commit('clearListDetail')
    return (
      cache.has(key)
        ? Promise.resolve(cache.get(key))
        : music[source].songList.getListDetail(id, page).then(result => ({ ...result, list: filterList(result.list) }))
    ).then(result => commit('setListDetail', { result, key, source, id, page }))
  },

  /**
   * 取列表全部明细
   * @param { LxMusic.Renderer.SongListActionContext } param0
   * @param { LxMusic.Renderer.SongListGetDetailInfo } param1
   * @returns { unknown } // TODO 未知
   */
  getListDetailAll({ state, rootState }, { source, id }) {
    // console.log(source, id)
    const loadData = (id, page) => {
      let key = `sdetail__${source}__${id}__${page}`
      return cache.has(key)
        ? Promise.resolve(cache.get(key))
        : music[source].songList.getListDetail(id, page).then(result => {
          cache.set(key, result)
          return result
        })
    }
    return loadData(id, 1).then(result => {
      if (result.total <= result.limit) return filterList(result.list)

      let maxPage = Math.ceil(result.total / result.limit)
      const loadDetail = (loadPage = 2) => {
        return loadPage == maxPage
          ? loadData(id, loadPage).then(result => result.list)
          : loadData(id, loadPage).then(result1 => loadDetail(++loadPage).then(result2 => [...result1.list, ...result2]))
      }
      return loadDetail().then(result2 => [...result.list, ...result2]).then(list => filterList(list))
    })
  },
}

// mitations
const mutations = {
  /**
   * 设置标签组
   * @param { LxMusic.Renderer.SongListState } state
   * @param { LxMusic.Renderer.MusicPlatformGetTagInfo } param1
   */
  setTags(state, { tags, source }) {
    state.tags[source] = tags
  },

  /**
   * 清除列表
   * @param { LxMusic.Renderer.SongListState } state
   */
  clearList(state) {
    state.list.list = []
    state.list.total = 0
  },

  /**
   * 设置列表
   * @param { LxMusic.Renderer.SongListState } state
   * @param { LxMusic.Renderer.SongListGetDetailInfo } param1
   */
  setList(state, { result, key, page }) {
    state.list.list = result.list
    state.list.total = result.total
    state.list.limit = result.limit
    state.list.page = page
    state.list.key = key
    cache.set(key, result)
  },

  /**
   * 设置列表明细
   * @param { LxMusic.Renderer.SongListState } state
   * @param { LxMusic.Renderer.SongListGetDetailInfo } param1
   */
  setListDetail(state, { result, key, source, id, page }) {
    state.listDetail.list = result.list
    state.listDetail.id = id
    state.listDetail.source = source
    state.listDetail.total = result.total
    state.listDetail.limit = result.limit
    state.listDetail.page = page
    state.listDetail.key = key
    state.listDetail.info = result.info || {
      name: state.selectListInfo.name,
      img: state.selectListInfo.img,
      desc: state.selectListInfo.desc,
      author: state.selectListInfo.author,
      play_count: state.selectListInfo.play_count,
    }
    cache.set(key, result)
  },

  /**
   * 设置显示列表明细
   * @param { LxMusic.Renderer.SongListState } state
   * @param { boolean } bool
   */
  setVisibleListDetail(state, bool) {
    if (!bool) state.listDetail.list = []
    state.isVisibleListDetail = bool
  },

  /**
   * 设置选择列表信息
   * @param { LxMusic.Renderer.SongListState } state
   * @param { LxMusic.Renderer.MusicPlatformDetailInfo["info"] } info
   */
  setSelectListInfo(state, info) {
    state.selectListInfo = info
  },

  /**
   * 清除列表明细
   * @param { LxMusic.Renderer.SongListState } state
   */
  clearListDetail(state) {
    state.listDetail = {
      id: null,
      source: null,
      list: [],
      desc: null,
      total: 0,
      page: 1,
      limit: 30,
      key: null,
      info: {},
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
