const { log } = require('../../common/utils')
const { autoUpdater } = require('electron-updater')
const { mainOn, mainSend, NAMES: { mainWindow: ipcMainWindowNames } } = require('../../common/ipc')

autoUpdater.logger = log
// autoUpdater.autoDownload = false
autoUpdater.logger.transports.file.level = 'info'

/** 为第一次检查更新 */ let isFirstCheckedUpdate = true

log.info('App starting...')


// -------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
// -------------------------------------------------------------------
// let win

/**
 * 发送状态至窗体
 * @param { string } text
 */
function sendStatusToWindow(text) {
  log.info(text)
  // ipcMain.send('message', text)
}


// -------------------------------------------------------------------
// Auto updates
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
// -------------------------------------------------------------------
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (ev, info) => {
// })
// autoUpdater.on('update-not-available', (ev, info) => {
// })
// autoUpdater.on('error', (ev, err) => {
// })
// autoUpdater.on('download-progress', (ev, progressObj) => {
// })
// autoUpdater.on('update-downloaded', (ev, info) => {
//   // Wait 5 seconds, then quit and install
//   // In your application, you don't need to wait 5 seconds.
//   // You could call autoUpdater.quitAndInstall(); immediately
//   // setTimeout(function() {
//   // autoUpdater.quitAndInstall()
//   // }, 5000)

// })

/**
 * 等待事件
 * @type { LxMusic.Utils.SendEventInfo<T>[] }
 * @template T
 */
let waitEvent = []

/**
 * 处理发送消息
 * @param { LxMusic.Utils.SendEventInfo<T> } action 消息动作
 * @template T
 */
const handleSendEvent = action => {
  if (global.modules.mainWindow) {
    setTimeout(() => { // 延迟发送事件，过早发送可能渲染进程还没启动完成
      if (!global.modules.mainWindow) return
      mainSend(global.modules.mainWindow, action.type, action.info)
    }, 2000)
  } else {
    waitEvent.push(action)
  }
}

/** 自动更新 */
module.exports = () => {
  if (!isFirstCheckedUpdate) {
    if (waitEvent.length) {
      waitEvent.forEach((event, index) => {
        setTimeout(() => { // 延迟发送事件，过早发送可能渲染进程还没启动完成
          if (!global.modules.mainWindow) return
          mainSend(global.modules.mainWindow, event.type, event.info)
        }, 2000 * (index + 1))
      })
      waitEvent = []
    }
    return
  }
  isFirstCheckedUpdate = false

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...')
  })
  autoUpdater.on('update-available', info => {
    sendStatusToWindow('Update available.')
    handleSendEvent({ type: ipcMainWindowNames.update_available, info })
  })
  autoUpdater.on('update-not-available', info => {
    sendStatusToWindow('Update not available.')
    handleSendEvent({ type: ipcMainWindowNames.update_not_available, info })
  })
  autoUpdater.on('error', err => {
    sendStatusToWindow('Error in auto-updater.')
    handleSendEvent({ type: ipcMainWindowNames.update_error, info: err.message })
  })
  autoUpdater.on('download-progress', progressObj => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    sendStatusToWindow(log_message)
    handleSendEvent({ type: ipcMainWindowNames.update_progress, info: progressObj })
  })
  autoUpdater.on('update-downloaded', info => {
    sendStatusToWindow('Update downloaded.')
    handleSendEvent({ type: ipcMainWindowNames.update_downloaded, info })
  })
  mainOn(ipcMainWindowNames.quit_update, () => {
    global.isQuitting = true

    setTimeout(() => {
      autoUpdater.quitAndInstall(true, true)
    }, 1000)
  })

  autoUpdater.checkForUpdates()
}

