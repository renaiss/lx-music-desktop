const { globalShortcut } = require('electron')
const { log } = require('../../../common/utils')

/**
 * 处理按键按下
 * @param { string } key 键值
 */
const handleKeyDown = key => {
  if (!global.appHotKey.enable) return
  global.lx_event.hotKey.keyDown({ type: 'global', key })
}

/** 转换键正则 */ const transformedKeyRxp = /(^|\+)[a-z]/g

/**
 * 转换键值
 * @param { string } key 键值
 */
const transformedKey = key => {
  if (key.includes('arrow')) key = key.replace(/arrow/g, '')
  return key.replace('mod', 'CommandOrControl').replace(transformedKeyRxp, l => l.toUpperCase())
}

/**
 * 注册热键
 * @param { LxMusic.HotKey.RegisterHotkeyInfo } default
 */
exports.registerHotkey = ({ key, info }) => {
  if (global.appHotKey.state[key] && global.appHotKey.state[key].status) return true
  let transKey = transformedKey(key)
  // console.log('Register key:', transKey)
  if (!global.appHotKey.state[key]) {
    global.appHotKey.state[key] = {
      status: false,
      info: null,
    }
  }
  global.appHotKey.state[key].info = info
  let status = global.appHotKey.state[key].status = globalShortcut.isRegistered(transKey)
    ? false
    : globalShortcut.register(transKey, () => {
      handleKeyDown(key)
    })
  return status
}

/**
 * 卸载热键
 * @param { string } key 键值
 */
exports.unRegisterHotkey = key => {
  let transKey = transformedKey(key)
  // console.log('Unregister key:', transKey)
  globalShortcut.unregister(transKey)
  delete global.appHotKey.state[key]
}

/** 卸载全部热键 */
exports.unRegisterHotkeyAll = () => {
  global.appHotKey.state = {}
  globalShortcut.unregisterAll()
}

exports.handleKeyDown = handleKeyDown
exports.transformedKey = transformedKey

/**
 * 处理注册热键
 * @param { LxMusic.HotKey.RegisterHotkeyInfo } data
 */
const handleRegisterHotkey = data => {
  let ret = exports.registerHotkey(data)
  if (!ret) log.info('Register hot key failed:', data.key)
}

/**
 * 初始化热键
 * @param { boolean } isForce 暴力注册
 */
exports.init = (isForce = false) => {
  exports.unRegisterHotkeyAll()
  if (!isForce && !global.appHotKey.config.global.enable) return
  global.appHotKey.state = {}
  // console.log(global.appHotKey.config.global.keys)
  for (const key of Object.keys(global.appHotKey.config.global.keys)) {
    try {
      handleRegisterHotkey({ key, info: global.appHotKey.config.global.keys[key] })
    } catch (err) {
      log.info(err)
    }
  }
}
