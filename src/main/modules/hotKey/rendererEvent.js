const {
  mainHandle,
  NAMES: {
    hotKey: ipcHotKeyNames,
  },
} = require('../../../common/ipc')
const { init, registerHotkey, unRegisterHotkey, unRegisterHotkeyAll } = require('./utils')

mainHandle(ipcHotKeyNames.set_config, async(event, info) => {
  switch (info.action) {
    case 'config':
      global.lx_event.hotKey.saveConfig(info.data, info.source)
      return true
    case 'enable':
      info.data ? init(true) : unRegisterHotkeyAll()
      return true
    case 'register':
      return registerHotkey(info.data)
    case 'unregister':
      return unRegisterHotkey(info.data)
  }
})

mainHandle(ipcHotKeyNames.status, async() => global.appHotKey.state)

mainHandle(ipcHotKeyNames.enable, async(event, flag) => {
  flag ? init() : unRegisterHotkeyAll()
})
