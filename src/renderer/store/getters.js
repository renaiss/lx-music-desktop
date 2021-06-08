import music from '../utils/music'

export default {
  /** @param { LxMusic.Renderer.StoreRootState } state */
  theme(state) {
    let theme = state.themes.find(theme => theme.id == state.setting.themeId)
    return (theme && theme.class) || ''
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  themes(state) {
    return {
      active: state.setting.themeId,
      list: state.themes,
    }
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  source(state) {
    const source = music.sources.find(s => s.id === state.setting.sourceId) || music.sources[0]
    return source
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  sources(state) {
    return {
      active: state.setting.sourceId,
      list: music.sources,
    }
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  sourceNames(state) {
    let prefix = 'store.state.source_'
    if (state.setting.sourceNameType == 'alias') prefix += 'alias_'
    /** @type { {[id in LxMusic.Renderer.SearchType]: string; } } */
    const sources = {}
    for (const source of music.sources) {
      sources[source.id] = window.i18n.t(prefix + source.id)
    }
    sources.all = window.i18n.t(prefix + 'all')
    return sources
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  userInfo(state) {
    return state.userInfo
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  setting(state) {
    return state.setting
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  settingVersion(state) {
    return state.settingVersion
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  version(state) {
    return state.version
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  route(state) {
    return state.route
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  windowSizeList(state) {
    return state.windowSizeList
  },
  /** @param { LxMusic.Renderer.StoreRootState } state */
  windowSizeActive(state) {
    return state.windowSizeList.find(i => i.id === state.setting.windowSizeId) || state.windowSizeList[0]
  },
}
