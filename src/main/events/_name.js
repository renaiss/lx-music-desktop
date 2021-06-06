/** @type { LxMusic.MainName.common } */
exports.common = {
  initConfig: 'initConfig',
  configStatus: 'config',
}

/** @type { LxMusic.MainName.mainWindow } */
exports.mainWindow = {
  name: 'mainWindow',
  setLyricInfo: 'setLyricInfo',
  destroy: 'destroy',
  quit: 'quit',
  toggle_minimize: 'toggle_minimize',
  toggle_hide: 'toggle_hide',
  ready_to_show: 'ready_to_show',
  show: 'show',
  hide: 'hide',
}

/** @type { LxMusic.MainName.tray } */
exports.tray = {
  name: 'tray',
  create: 'create',
  destroy: 'destroy',
}

/** @type { LxMusic.MainName.winLyric } */
exports.winLyric = {
  name: 'winLyric',
  create: 'create',
  close: 'close',
}

/** @type { LxMusic.MainName.hotKey } */
exports.hotKey = {
  name: 'hotKey',
  init: 'init',
  config: 'config',
  keyDown: 'keyDown',
}
