const { app, Tray, Menu } = require('electron')
const { isWin } = require('../../common/utils')
const { tray: TRAY_EVENT_NAME, common: COMMON_EVENT_NAME, mainWindow: MAIN_WINDOW_NAME } = require('../events/_name')
const path = require('path')
let isEnableTray = null
let themeId = null
const themeList = [
  {
    id: 0,
    fileName: 'tray0Template',
    isNative: true,
  },
  {
    id: 1,
    fileName: 'tray1Template',
    isNative: false,
  },
]
global.lx_event.common.on(COMMON_EVENT_NAME.configStatus, sourceName => {
  if (sourceName === TRAY_EVENT_NAME.name) return
  if (themeId !== global.appSetting.tray.themeId) {
    themeId = global.appSetting.tray.themeId
    setTrayImage(themeId)
  }
  if (isEnableTray !== global.appSetting.tray.isShow) {
    isEnableTray = global.appSetting.tray.isShow
    global.appSetting.tray.isShow ? createTray() : destroyTray()
  }
  createMenu(global.modules.tray)
})

global.lx_event.mainWindow.on(MAIN_WINDOW_NAME.ready_to_show, () => {
  createMenu(global.modules.tray)
})
global.lx_event.mainWindow.on(MAIN_WINDOW_NAME.show, () => {
  createMenu(global.modules.tray)
})
global.lx_event.mainWindow.on(MAIN_WINDOW_NAME.hide, () => {
  createMenu(global.modules.tray)
})

/** 创建托盘 */
const createTray = () => {
  if ((global.modules.tray && !global.modules.tray.isDestroyed()) || !global.appSetting.tray || !global.appSetting.tray.isShow) return

  themeId = global.appSetting.tray.themeId
  let themeName = (themeList.find(item => item.id === themeId) || themeList[0]).fileName
  const iconPath = path.join(global.__static, 'images/tray', isWin ? themeName + '@2x.ico' : themeName + '.png')

  // 托盘
  global.modules.tray = new Tray(iconPath)

  global.modules.tray.setToolTip('洛雪音乐助手')
  createMenu(global.modules.tray)
  global.modules.tray.setIgnoreDoubleClickEvents(true)
  global.modules.tray.on('click', () => {
    const mainWindow = global.modules.mainWindow
    if (!mainWindow) return
    mainWindow.isVisible()
      ? mainWindow.focus()
      : mainWindow.show()
  })
}

/** 销毁托盘 */
const destroyTray = () => {
  if (!global.modules.tray) return
  global.modules.tray.destroy()
  global.modules.tray = null
}

/**
 * 创建托盘菜单
 * @param { Electron.Tray } tray 托盘信息
*/
const createMenu = tray => {
  if (!global.modules.tray) return
  let menu = []
  global.modules.mainWindow && menu.push(global.modules.mainWindow.isVisible() ? {
    label: '隐藏主界面',
    click() {
      global.modules.mainWindow.hide()
    },
  } : {
    label: '显示主界面',
    click() {
      if (!global.modules.mainWindow) return
      if (!global.modules.mainWindow.isVisible()) {
        global.modules.mainWindow.show()
      }
      global.modules.mainWindow.restore()
      global.modules.mainWindow.focus()
    },
  })
  menu.push(global.appSetting.desktopLyric.enable ? {
    label: '关闭桌面歌词',
    click() {
      global.lx_core.setAppConfig({ desktopLyric: { enable: false } }, TRAY_EVENT_NAME.name)
    },
  } : {
    label: '开启桌面歌词',
    click() {
      global.lx_core.setAppConfig({ desktopLyric: { enable: true } }, TRAY_EVENT_NAME.name)
    },
  })
  menu.push(global.appSetting.desktopLyric.isLock ? {
    label: '解锁桌面歌词',
    click() {
      global.lx_core.setAppConfig({ desktopLyric: { isLock: false } }, TRAY_EVENT_NAME.name)
    },
  } : {
    label: '锁定桌面歌词',
    click() {
      global.lx_core.setAppConfig({ desktopLyric: { isLock: true } }, TRAY_EVENT_NAME.name)
    },
  })
  menu.push(global.appSetting.desktopLyric.isAlwaysOnTop ? {
    label: '取消置顶',
    click() {
      global.lx_core.setAppConfig({ desktopLyric: { isAlwaysOnTop: false } }, TRAY_EVENT_NAME.name)
    },
  } : {
    label: '置顶歌词',
    click() {
      global.lx_core.setAppConfig({ desktopLyric: { isAlwaysOnTop: true } }, TRAY_EVENT_NAME.name)
    },
  })
  menu.push({
    label: '退出',
    click() {
      global.isQuitting = true
      app.quit()
    },
  })
  const contextMenu = Menu.buildFromTemplate(menu)
  tray.setContextMenu(contextMenu)
}

const setTrayImage = themeId => {
  if (!global.modules.tray) return
  let themeName = (themeList.find(item => item.id === themeId) || themeList[0]).fileName
  const iconPath = path.join(global.__static, 'images/tray', isWin ? themeName + '@2x.ico' : themeName + '.png')
  global.modules.tray.setImage(iconPath)
}
