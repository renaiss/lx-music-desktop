import music from '../../utils/music'
/** @type { LxMusic.Renderer.MusicSourcesMap } */ const sourceList = {}
/** @type { LxMusic.Renderer.MusicSources } */ const sources = []
/** @type { LxMusic.Renderer.LeaderboardCacheMap } */ const cache = new Map()
for (const source of music.sources) {
  const leaderboard = music[source.id].leaderboard
  if (!leaderboard || !leaderboard.getBoards) continue
  sourceList[source.id] = []
  sources.push(source)
}

// state
/** @type { LxMusic.Renderer.LeaderboardModule["state"] } */
const state = {
  boards: sourceList,
  list: [],
  total: 0,
  page: 1,
  limit: 30,
  key: null,
}

// getters
/** @type { LxMusic.Renderer.LeaderboardModule["getters"] } */
const getters = {
  sources(state, getters, rootState, { sourceNames }) {
    return sources.map(item => ({ id: item.id, name: sourceNames[item.id] }))
  },
  boards(state) {
    return state.boards
  },
  list(state) {
    return state.list
  },
  info(state) {
    return {
      total: state.total,
      limit: state.limit,
      page: state.page,
    }
  },
}

// actions
/** @type { LxMusic.Renderer.LeaderboardModule["actions"] } */
const actions = {
  /** 取排行榜列表 */
  getBoardsList({ state, rootState, commit }) {
    // if (state.boards.length)
    let source = rootState.setting.leaderboard.source
    // let tabId = rootState.setting.leaderboard.tabId
    // let key = `${source}${tabId}${page}`
    // if (state.list.length && state.key == key) return true
    // commit('clearList')
    if (state.boards[source].length) return
    return music[source].leaderboard.getBoards().then(result => commit('setBoardsList', { boards: result, source }))
  },

  /**
   * 获取列表
   * @param { LxMusic.Renderer.LeaderboardActionContext } param0
   * @param { number } page
  */
  getList({ state, rootState, commit }, page) {
    // let source = rootState.setting.leaderboard.source
    let tabId = rootState.setting.leaderboard.tabId
    let [source, bangId] = tabId.split('__')
    let key = `${source}${tabId}${page}`
    if (state.list.length && state.key == key) return Promise.resolve()
    commit('clearList')
    // return (
    //   cache.has(key)
    //     ? Promise.resolve(cache.get(key))
    //     : music[source].leaderboard.getList(bangId, page)
    // ).then(result => commit('setList', { result, key }))
    return music[source].leaderboard.getList(bangId, page).then(result => commit('setList', { result, key }))
  },

  /**
   * 获取全部列表
   * @param { LxMusic.Renderer.LeaderboardActionContext } param0
   * @param { string } id
   */
  getListAll({ state, rootState }, id) {
    // console.log(source, id)
    let [source, bangId] = id.split('__')
    const loadData = (id, page) => {
      let key = `${source}${id}${page}`
      return cache.has(key)
        ? Promise.resolve(cache.get(key))
        : music[source].leaderboard.getList(bangId, page).then(result => {
          cache.set(key, result)
          return result
        })
    }
    return loadData(id, 1).then(result => {
      if (result.total <= result.limit) return result.list

      let maxPage = Math.ceil(result.total / result.limit)
      const load = (loadPage = 2) => {
        return loadPage == maxPage
          ? loadData(id, loadPage).then(result => result.list)
          : loadData(id, loadPage).then(result1 => load(++loadPage).then(result2 => [...result1.list, ...result2]))
      }
      return load().then(result2 => [...result.list, ...result2])
    })
  },
}

// mitations
/** @type { LxMusic.Renderer.LeaderboardModule["mutations"] } */
const mutations = {
  /**
   * 设置排行榜
   * @param { LxMusic.Renderer.LeaderboardState } state
   * @param { LxMusic.Renderer.LeaderboardSetInfo } param1
   */
  setBoardsList(state, { boards, source }) {
    state.boards[source] = boards.list
  },
  /**
   * 设置列表
   * @param { LxMusic.Renderer.LeaderboardState } state
   * @param { LxMusic.Renderer.LeaderboardSetInfo } param1
   */
  setList(state, { result, key }) {
    state.list = result.list
    state.total = result.total
    state.limit = result.limit
    state.page = result.page
    state.key = key
    cache.set(key, result)
  },
  clearList(state) {
    state.list = []
    state.total = 0
  },
}

/** @type { LxMusic.Renderer.LeaderboardModule } */
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
