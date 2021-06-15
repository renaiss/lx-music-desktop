import music from '../../utils/music'

/** @type { LxMusic.Renderer.MusicSources } */ const sources = []
/** @type { LxMusic.Renderer.SearchSourcePageInfoMap } */ const sourceList = {}
/** @type { LxMusic.Renderer.SearchSourceMaxPageMap } */ const sourceMaxPage = {}
for (const source of music.sources) {
  const musicSearch = music[source.id].musicSearch
  if (!musicSearch) continue
  sources.push(source)
  sourceList[source.id] = {
    page: 1,
    allPage: 0,
    limit: 30,
    total: 0,
    list: [],
  }
  sourceMaxPage[source.id] = 0
}

// https://blog.csdn.net/xcxy2015/article/details/77164126#comments
/**
 * @param { string } a
 * @param { string } b
 */
const similar = (a, b) => {
  if (!a || !b) return 0
  if (a.length > b.length) { // 保证 a <= b
    let t = b
    b = a
    a = t
  }
  let al = a.length
  let bl = b.length
  let mp = [] // 一个表
  let i, j, ai, lt, tmp // ai：字符串a的第i个字符。 lt：左上角的值。 tmp：暂存新的值。
  for (i = 0; i <= bl; i++) mp[i] = i
  for (i = 1; i <= al; i++) {
    ai = a.charAt(i - 1)
    lt = mp[0]
    mp[0] = mp[0] + 1
    for (j = 1; j <= bl; j++) {
      tmp = Math.min(mp[j] + 1, mp[j - 1] + 1, lt + (ai == b.charAt(j - 1) ? 0 : 1))
      lt = mp[j]
      mp[j] = tmp
    }
  }
  return 1 - (mp[bl] / bl)
}

/**
 * @param { number[] } arr
 * @param { LxMusic.Renderer.SearchSortInfo } data
 */
const sortInsert = (arr, data) => {
  let key = data.num
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let middle = parseInt((left + right) / 2)
    if (key == arr[middle]) {
      left = middle
      break
    } else if (key < arr[middle].num) {
      right = middle - 1
    } else {
      left = middle + 1
    }
  }
  while (left > 0) {
    if (arr[left - 1].num != key) break
    left--
  }

  arr.splice(left, 0, data)
}

/**
 * @param { LxMusic.UserApiEvent.SongInfo[] } list
 * @param {*} keyword
 */
const handleSortList = (list, keyword) => {
  /** @type { LxMusic.UserApiEvent.SongInfo[] } */
  let arr = []
  for (const item of list) {
    sortInsert(arr, {
      num: similar(keyword, `${item.name} ${item.singer}`),
      data: item,
    })
  }
  // TODO SongInfo 的 Data
  return arr.map(item => item.data).reverse()
}

sources.push({
  id: 'all',
  name: '聚合搜索',
})

// state
/** @type { LxMusic.Renderer.SearchState } */
const state = {
  sourceList,
  list: [],
  text: '',
  page: 1,
  limit: 30,
  allPage: 1,
  total: 0,
  sourceMaxPage,
  historyList: [],
}

// getters
const getters = {
  /**
   * @param  { LxMusic.Renderer.SearchActionContext["state"] } state
   * @param  { LxMusic.Renderer.SearchActionContext["getters"] } getters
   * @param  { LxMusic.Renderer.SearchActionContext["rootState"] } rootState
   * @param  { LxMusic.Renderer.SearchActionContext["rootGetters"] } rootGetters
   */
  sources(state, getters, rootState, { sourceNames }) { return sources.map(item => ({ id: item.id, name: sourceNames[item.id] })) },
  /** @param { LxMusic.Renderer.SearchState } state */ sourceList: state => state.sourceList || [],
  /** @param { LxMusic.Renderer.SearchState } state */ searchText: state => state.text,
  /** @param { LxMusic.Renderer.SearchState } state */ historyList: state => state.historyList,
  /** @param { LxMusic.Renderer.SearchState } state */ allList: state => ({ list: state.list, allPage: state.allPage, page: state.page, total: state.total, limit: state.limit, sourceMaxPage: state.sourceMaxPage }),
}

// actions
const actions = {
  /**
   * 搜素
   * @param { LxMusic.Renderer.SearchActionContext } param0
   * @param { LxMusic.Renderer.SearchState } param1
   */
  search({ commit, rootState }, { text, page, limit }) {
    commit('setText', text)
    commit('addHistory', text)
    if (rootState.setting.search.searchSource == 'all') {
      let task = []
      for (const source of sources) {
        if (source.id == 'all') continue
        task.push(music[source.id].musicSearch.search(text, page).catch(error => {
          console.log(error)
          return {
            allPage: 1,
            limit: 30,
            list: [],
            source: source.id,
            total: 0,
          }
        }))
      }
      return Promise.all(task).then(results => commit('setLists', { results, page }))
    } else {
      return music[rootState.setting.search.searchSource].musicSearch.search(text, page, limit).catch(error => {
        console.log(error)
        return {
          allPage: 1,
          limit: 30,
          list: [],
          source: rootState.setting.search.searchSource,
          total: 0,
        }
      }).then(data => commit('setList', { page, ...data }))
    }
  },
}

// mitations
const mutations = {
  /**
   * 设置文本
   * @param { LxMusic.Renderer.SearchState } state
   * @param { LxMusic.Renderer.SearchState["text"] } text
   */
  setText(state, text) {
    state.text = text
  },

  /**
   * 设置列表
   * @param { LxMusic.Renderer.SearchState } state
   * @param { LxMusic.Renderer.MusicPlatformMusicSearchResult } datas
   */
  setList(state, datas) {
    let source = state.sourceList[datas.source]
    source.list = datas.list
    source.total = datas.total
    source.allPage = datas.allPage
    source.page = datas.page
    source.limit = datas.limit
  },

  /**
   * 设置一组列表
   * @param { LxMusic.Renderer.SearchState } state
   * @param { LxMusic.Renderer.SearchResultListInfo } param1
   */
  setLists(state, { results, page }) {
    let pages = []
    let total = 0
    let limit = 0
    let list = []
    for (const source of results) {
      state.sourceMaxPage[source.source] = source.allPage
      if (source.allPage < page) continue
      list.push(...source.list)
      pages.push(source.allPage)
      total += source.total
      // limit = Math.max(source.limit, limit)
    }
    state.allPage = Math.max(...pages)
    state.total = total
    state.limit = limit
    state.page = page
    state.list = handleSortList(list, state.text)
  },

  /**
   * 清除列表
   * @param { LxMusic.Renderer.SearchState } state
   */
  clearList(state) {
    for (const source of Object.keys(state.sourceList)) {
      state.sourceList[source].list = []
      state.sourceList[source].page = 0
      state.sourceList[source].allPage = 0
      state.sourceList[source].total = 0
      state.sourceMaxPage[source] = 0
    }
    state.list.length = []
    state.page = 0
    state.allPage = 0
    state.total = 0
    state.text = ''
  },

  /**
   * 添加搜索历史
   * @param { LxMusic.Renderer.SearchState } state
   * @param { string } text
   */
  addHistory(state, text) {
    let index = state.historyList.indexOf(text)
    if (index > -1) state.historyList.splice(index, 1)
    if (state.historyList.length >= 15) state.historyList = state.historyList.slice(0, 14)
    state.historyList.unshift(text)
  },

  /**
   * 移除搜索历史
   * @param { LxMusic.Renderer.SearchState } state
   * @param { number } index
   */
  removeHistory(state, index) {
    state.historyList.splice(index, 1)
  },

  /**
   * 清除搜索历史
   * @param { LxMusic.Renderer.SearchState } state
   */
  clearHistory(state) {
    state.historyList = []
  },

  /**
   * 设置搜索历史
   * @param { LxMusic.Renderer.SearchState } state
   * @param { string[] } list
   */
  setHistory(state, list) {
    state.historyList = list
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
