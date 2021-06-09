/** @type { LxMusic.MainName.LxEventDataNameMap["common"] } */
exports.common = {
  initConfig: 'initConfig',
  configStatus: 'config',
}

/** @type { LxMusic.MainName.LxEventDataNameMap["mainWindow"] } */
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

/** @type { LxMusic.MainName.LxEventDataNameMap["tray"] } */
exports.tray = {
  name: 'tray',
  create: 'create',
  destroy: 'destroy',
}

/** @type { LxMusic.MainName.LxEventDataNameMap["winLyric"] } */
exports.winLyric = {
  name: 'winLyric',
  create: 'create',
  close: 'close',
}

/** @type { LxMusic.MainName.LxEventDataNameMap["hotKey"] } */
exports.hotKey = {
  name: 'hotKey',
  init: 'init',
  config: 'config',
  keyDown: 'keyDown',
}
