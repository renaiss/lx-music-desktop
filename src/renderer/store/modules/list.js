import musicSdk from '../../utils/music'
import { clearLyric, clearMusicUrl } from '../../utils'

/** @type { LxMusic.Renderer.PlayListMap } */ let allList = {}
window.allList = allList

const allListInit = (defaultList, loveList, userList) => {
  allList[defaultList.id] = defaultList
  allList[loveList.id] = loveList
  for (const list of userList) allList[list.id] = list
}
const allListUpdate = list => {
  allList[list.id] = list
}
const allListRemove = list => {
  delete allList[list.id]
}

// state
/** @type { LxMusic.Renderer.PlayListModule["state"] } */
const state = {
  isInitedList: false,
  defaultList: {
    id: 'default',
    name: '试听列表',
    list: [],
    location: 0,
  },
  loveList: {
    id: 'love',
    name: '我的收藏',
    list: [],
    location: 0,
  },
  tempList: {
    id: 'temp',
    name: '临时列表',
    list: [],
    location: 0,
  },
  userList: [],
}

// getters
/** @type { LxMusic.Renderer.PlayListModule["getters"] } */
const getters = {
  isInitedList: state => state.isInitedList,
  defaultList: state => state.defaultList || {},
  loveList: state => state.loveList || {},
  userList: state => state.userList,
  allList: () => allList,
}

// actions
/** @type { LxMusic.Renderer.PlayListModule["actions"] } */
const actions = {
  /**
   * 取其它来源
   * @param { LxMusic.Renderer.PlayListActionContext } param0
   * @param { LxMusic.UserApiEvent.SongInfo } musicInfo
   */
  getOtherSource({ state, commit }, musicInfo) {
    return (musicInfo.otherSource && musicInfo.otherSource.length ? Promise.resolve(musicInfo.otherSource) : musicSdk.findMusic(musicInfo)).then(otherSource => {
      commit('setOtherSource', { musicInfo, otherSource })
      return otherSource
    })
  },
}

// mitations
/** @type { LxMusic.Renderer.PlayListModule["mutations"] } */
const mutations = {
  /**
   * 初始化列表
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateInitInfo } param1
   */
  initList(state, { defaultList, loveList, userList }) {
    if (defaultList != null) Object.assign(state.defaultList, { list: defaultList.list, location: defaultList.location })
    if (loveList != null) Object.assign(state.loveList, { list: loveList.list, location: loveList.location })
    if (userList != null) state.userList = userList
    allListInit(state.defaultList, state.loveList, state.userList)
    state.isInitedList = true
  },

  /**
   * 设置列表
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListInfo } param1
   */
  setList(state, { id, list, name, location, source, sourceListId }) {
    /** @type { LxMusic.Renderer.PlayListInfo } */ const targetList = allList[id]
    if (targetList) {
      if (name && targetList.name === name) {
        targetList.list.splice(0, targetList.list.length, ...list)
        targetList.location = location
        return
      }

      id += '_' + Math.random()
    }
    let newList = {
      name,
      id,
      list,
      location,
      source,
      sourceListId,
    }
    state.userList.push(newList)
    allListUpdate(newList)
  },

  /**
   * 列表添加
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateAddInfo } param1
   */
  listAdd(state, { id, musicInfo }) {
    const targetList = allList[id]
    if (!targetList) return
    if (targetList.list.some(s => s.songmid === musicInfo.songmid)) return
    targetList.list.push(musicInfo)
  },

  /**
   * 列表移动
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateMoveInfo } param1
   */
  listMove(state, { fromId, musicInfo, toId }) {
    const fromList = allList[fromId]
    const toList = allList[toId]
    if (!fromList || !toList) return
    fromList.list.splice(fromList.list.indexOf(musicInfo), 1)
    let index = toList.list.findIndex(s => s.songmid === musicInfo.songmid)
    if (index < 0) toList.list.push(musicInfo)
  },

  /**
   * 列表批量添加
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateAddMultipleInfo } param1
   */
  listAddMultiple(state, { id, list }) {
    let targetList = allList[id]
    if (!targetList) return
    let newList = [...targetList.list, ...list]
    /** @type { LxMusic.UserApiEvent.SongMap } */ let map = {}
    /** @type { string } */ let ids = []
    for (const item of newList) {
      if (map[item.songmid]) continue
      ids.push(item.songmid)
      map[item.songmid] = item
    }
    targetList.list.splice(0, targetList.list.length, ...ids.map(id => map[id]))
  },

  /**
   * 列表批量移动
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateMoveMultipleInfo } param1
   */
  listMoveMultiple(state, { fromId, toId, list }) {
    // console.log(state.commit)
    this.commit('list/listRemoveMultiple', { id: fromId, list })
    this.commit('list/listAddMultiple', { id: toId, list })
  },

  /**
   * 列表移除
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateRemoveInfo } param1
   */
  listRemove(state, { id, index }) {
    let targetList = allList[id]
    if (!targetList) return
    targetList.list.splice(index, 1)
  },

  /**
   * 列表批量移除
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateRemoveMultipleInfo } param1
   */
  listRemoveMultiple(state, { id, list }) {
    let targetList = allList[id]
    if (!targetList) return
    /** @type { LxMusic.UserApiEvent.SongMap } */ let map = {}
    /** @type { string } */ let ids = []
    for (const item of targetList.list) {
      ids.push(item.songmid)
      map[item.songmid] = item
    }
    for (const item of list) {
      if (map[item.songmid]) delete map[item.songmid]
    }
    /** @type { LxMusic.UserApiEvent.SongInfo[] } */ let newList = []
    for (const id of ids) if (map[id]) newList.push(map[id])

    targetList.list.splice(0, targetList.list.length, ...newList)
  },

  /**
   * 列表清空
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.UserApiEvent.SongInfo["albumId"] } id
   */
  listClear(state, id) {
    let targetList = allList[id]
    if (!targetList) return
    targetList.list.splice(0, targetList.list.length)
  },

  /**
   * 更新音乐信息
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateUpdateMusicInfo } param1
   */
  updateMusicInfo(state, { id, index, data, musicInfo = {} }) {
    let targetList = allList[id]
    if (!targetList) return Object.assign(musicInfo, data)
    Object.assign(targetList.list[index], data)
  },

  /**
   * 创建用户列表
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListInfo } param1
   */
  createUserList(state, { name, id = `userlist_${Date.now()}`, list = [], source, sourceListId }) {
    let newList = state.userList.find(item => item.id === id)
    if (!newList) {
      newList = {
        name,
        id,
        list: [],
        location: 0,
        source,
        sourceListId,
      }
      state.userList.push(newList)
      allListUpdate(newList)
    }
    this.commit('list/listAddMultiple', { id, list })
  },

  /**
   * 移除用户列表
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { number } index
   */
  removeUserList(state, index) {
    let list = state.userList.splice(index, 1)[0]
    allListRemove(list)
  },

  /**
   * 设置用户列表名称
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateSetUserListNameInfo } param1
   * @returns
   */
  setUserListName(state, { index, name }) {
    let list = state.userList[index]
    if (!list) return
    list.name = name
  },

  /**
   * 上移用户列表
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { number } index
   */
  moveupUserList(state, index) {
    let targetList = state.userList[index]
    state.userList.splice(index, 1)
    state.userList.splice(index - 1, 0, targetList)
  },

  /**
   * 下移用户列表
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { number } index
   */
  movedownUserList(state, index) {
    let targetList = state.userList[index]
    state.userList.splice(index, 1)
    state.userList.splice(index + 1, 0, targetList)
  },

  /**
   * 设置列表滚动
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListStateScrollInfo } param1
   */
  setListScroll(state, { id, location }) {
    if (allList[id]) allList[id].location = location
  },

  /**
   * 排序列表
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListSortInfo } param1
   */
  sortList(state, { id, sortNum, musicInfos }) {
    let targetList = allList[id]
    this.commit('list/listRemoveMultiple', { id, list: musicInfos })

    targetList.list.splice(sortNum - 1, 0, ...musicInfos)
  },

  /** 清除缓存 */
  clearCache() {
    const lists = Object.values(allList)
    for (const { list } of lists) {
      for (const item of list) {
        if (item.otherSource) item.otherSource = null
        if (item.typeUrl['128k']) delete item.typeUrl['128k']
        if (item.typeUrl['320k']) delete item.typeUrl['320k']
        if (item.typeUrl.flac) delete item.typeUrl.flac
        if (item.typeUrl.wav) delete item.typeUrl.wav

        // v1.8.2以前的Lyric
        if (item.lxlrc) delete item.lxlrc
        if (item.lrc) delete item.lrc
        if (item.tlrc) delete item.tlrc
      }
    }
    clearMusicUrl()
    clearLyric()
  },

  /**
   * 设置其它来源
   * @param { LxMusic.Renderer.PlayListState } state
   * @param { LxMusic.Renderer.PlayListSetOtherSourceInfo } param1
   */
  setOtherSource(state, { musicInfo, otherSource }) {
    musicInfo.otherSource = otherSource
  },
}

/** @type { LxMusic.Renderer.PlayListModule } */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
