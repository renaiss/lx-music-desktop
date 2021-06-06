const { ipcMain, ipcRenderer } = require('electron')
const names = require('./ipcNames')

/** @type { LxMusic.Common.MainOn }         */ exports.mainOn = (name, callback) => ipcMain.on(name, callback)
/** @type { LxMusic.Common.MainSend }       */ exports.mainSend = (window, name, params) => window.webContents.send(name, params)
/** @type { LxMusic.Common.MainHandle }     */ exports.mainHandle = (name, callback) => ipcMain.handle(name, callback)
/** @type { LxMusic.Common.RendererOn }     */ exports.rendererOn = (name, callback) => ipcRenderer.on(name, callback)
/** @type { LxMusic.Common.RendererSend }   */ exports.rendererSend = (name, params) => ipcRenderer.send(name, params)
/** @type { LxMusic.Common.RendererInvoke } */ exports.rendererInvoke = (name, params) => ipcRenderer.invoke(name, params)

/** @deprecated */ exports.mainOnce = (name, callback) => ipcMain.once(name, callback)
/** @deprecated */ exports.mainOff = (name, callback) => ipcMain.removeListener(name, callback)
/** @deprecated */ exports.mainOffAll = name => ipcMain.removeAllListeners(name)
/** @deprecated */ exports.mainHandleOnce = (name, callback) => ipcMain.handleOnce(name, callback)
/** @deprecated */ exports.mainHandleRemove = name => ipcMain.removeListener(name)
/** @deprecated */ exports.rendererSendSync = (name, params) => ipcRenderer.sendSync(name, params)
/** @deprecated */ exports.rendererOnce = (name, callback) => ipcRenderer.once(name, callback)
/** @deprecated */ exports.rendererOff = (name, callback) => ipcRenderer.removeListener(name, callback)
/** @deprecated */ exports.rendererOffAll = name => ipcRenderer.removeAllListeners(name)

exports.NAMES = names
