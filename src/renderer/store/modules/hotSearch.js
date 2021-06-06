import music from '../../utils/music'
/** @type { LxMusic.Renderer.SearchSources } */ const sources = []
/** @type { LxMusic.Renderer.MusicSourcesMap } */ const sourceList = {}
for (const source of music.sources) {
  const hotSearch = music[source.id].hotSearch
  if (!hotSearch) continue
  sources.push(source)
  sourceList[source.id] = []
}

sources.push({
  id: 'all',
  name: '聚合搜索',
})

// state
/** @type { LxMusic.Renderer.HotSearchState } */
const state = {
  list: {
    ...sourceList,
    all: [],
  },
  currentSource: null,
}

// getters
const getters = {
  /**
   * @param { LxMusic.Renderer.HotSearchState } state
   * @param { LxMusic.Renderer.HotSearchActionContext["getters"] } getters
   * @param { LxMusic.Renderer.HotSearchActionContext["rootState"] } rootState
   * @param { { sourceNames: LxMusic.Renderer.SearchMap; } } param3
   */
  sources(state, getters, rootState, { sourceNames }) {
    return sources.map(item => ({ id: item.id, name: sourceNames[item.id] }))
  },
  /** @param { LxMusic.Renderer.HotSearchState } state */
  list: state => state.list,
}

// actions
const actions = {
  /**
   * 获取列表
   * @param { LxMusic.Renderer.HotSearchActionContext } param0
   * @param { LxMusic.Renderer.SearchType } source
   * @returns
   */
  getList({ state, commit }, source) {
    if (source == 'all') {
      let task = []
      for (const source of sources) {
        if (source.id == 'all') continue
        task.push(
          state.list[source.id].length
            ? Promise.resolve({ source: source.id, list: state.list[source.id] })
            : music[source.id].hotSearch.getList(),
        )
      }
      Promise.all(task).then(results => commit('setLists', results))
    } else {
      if (!music[source].hotSearch) {
        commit('setList', { source, data: null })
        return Promise.resolve()
      }
      return music[source].hotSearch.getList()
        .then(data => commit('setList', { source, data }))
    }
  },
}

// mitations
const mutations = {
  /**
   * 设置列表
   * @param { LxMusic.Renderer.HotSearchState } state
   * @param { LxMusic.Renderer.HotSearchSetListInfo } param1
   */
  setList(state, { source, data }) {
    state.list[source] = data ? data.list.slice(0, 20) : []
  },
  /**
   * 设置列表组
   * @param { LxMusic.Renderer.HotSearchState } state
   * @param { LxMusic.Renderer.HotSearchSetListInfo[] } lists
   */
  setLists(state, lists) {
    let list = new Map()
    for (const source of lists) {
      if (!state.list[source.source].length) state.list[source.source] = source.list.slice(0, 20)
      const sourceList = source.list.slice(0, 10)
      for (let item of sourceList) {
        item = item.trim()
        list.set(item, (list.has(item) ? list.get(item) : 0) + 1)
      }
    }
    list = Array.from(list)
    list.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
    list.sort((a, b) => b[1] - a[1])
    list = list.map(item => item[0])
    state.list.all = list
  },
  /**
   * 清除列表
   * @param { LxMusic.Renderer.HotSearchState } state
   * @param { LxMusic.Renderer.MusicSourcesId } source
   */
  clearList(state, source) {
    state.list[source] = []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
