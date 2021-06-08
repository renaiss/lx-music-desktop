export default {
  /**
   * 设置主题
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Renderer.StoreThemeId } val
   */
  setTheme(state, val) {
    state.setting.themeId = val
  },

  /**
   * 设置搜索资源
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Common.Search } param1
   */
  setSearchSource(state, { searchSource, tempSearchSource }) {
    if (searchSource != null) state.setting.search.searchSource = searchSource
    if (tempSearchSource != null) state.setting.search.tempSearchSource = tempSearchSource
  },

  /**
   * 设置程序设置
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Common.Setting } val
   */
  setSetting(state, val) {
    state.setting = val
  },

  /**
   * 设置配置版本
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { string } val
   */
  setSettingVersion(state, val) {
    state.settingVersion = val
  },

  /**
   * 设置签订协议
   * @param { LxMusic.Renderer.StoreRootState } state
   */
  setAgreePact(state) {
    state.setting.isAgreePact = true
  },

  /**
   * 设置排行榜
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Common.Leaderboard } param1
   */
  setLeaderboard(state, { tabId, source }) {
    if (tabId != null) state.setting.leaderboard.tabId = tabId
    if (source != null) state.setting.leaderboard.source = source
  },

  /**
   * 设置歌曲列表
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Common.SongList } param1
   */
  setSongList(state, { sortId, tagInfo, source }) {
    if (tagInfo != null) state.setting.songList.tagInfo = tagInfo
    if (sortId != null) state.setting.songList.sortId = sortId
    if (source != null) state.setting.songList.source = source
  },

  /**
   * 设置新版本
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { string } val
   */
  setNewVersion(state, val) {
    state.version.newVersion = val
  },

  /**
   * 设置下载进度
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Common.Download } info
   */
  setDownloadProgress(state, info) {
    state.version.downloadProgress = info
  },

  /**
   * 设置版本模式可见
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Renderer.StoreVersionInfo } param1
   */
  setVersionModalVisible(state, { isShow, isError, isDownloaded, isTimeOut, isDownloading, isUnknow, isLatestVer }) {
    if (isError !== undefined) state.version.isError = isError
    if (isTimeOut !== undefined) state.version.isTimeOut = isTimeOut
    if (isDownloading !== undefined) state.version.isDownloading = isDownloading
    if (isDownloaded !== undefined) state.version.isDownloaded = isDownloaded
    if (isUnknow !== undefined) state.version.isUnknow = isUnknow
    if (isLatestVer !== undefined) state.version.isLatestVer = isLatestVer
    if (isShow !== undefined) state.version.showModal = isShow
  },

  /**
   * 设置忽略版本
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { string } version
   */
  setIgnoreVersion(state, version) {
    state.setting.ignoreVersion = version
  },

  /**
   * 设置音量
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { number | boolean } val
   */
  setVolume(state, val) {
    if (typeof val == 'boolean') {
      state.setting.player.isMute = val
    } else {
      state.setting.player.volume = val
    }
  },

  /**
   * 设置播放下一曲模式
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Common.PlayMethodInfo } val
   */
  setPlayNextMode(state, val) {
    state.setting.player.togglePlayMethod = val
  },

  /**
   * 设置·桌面歌词
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { boolean } val
   */
  setVisibleDesktopLyric(state, val) {
    state.setting.desktopLyric.enable = val
  },

  /**
   * 锁定桌面歌词
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { boolean } val
   */
  setLockDesktopLyric(state, val) {
    state.setting.desktopLyric.isLock = val
  },

  /**
   * 设置媒体设备
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { string } val
   */
  setMediaDeviceId(state, val) {
    state.setting.player.mediaDeviceId = val
  },

  /**
   * 设置上个列表编号
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { string } val
   */
  setPrevSelectListId(state, val) {
    state.setting.list.prevSelectListId = val
  },

  /**
   * 设置桌面歌词配置
   * @param { LxMusic.Renderer.StoreRootState } state
   * @param { LxMusic.Common.DesktopLyric } config
   */
  setDesktopLyricConfig(state, config) {
    state.setting.desktopLyric = Object.assign(state.setting.desktopLyric, config)
  },
}
