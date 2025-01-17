const { windowSizeList } = require('../../common/config')
const { objectDeepMerge, throttle, initSetting } = require('../../common/utils')
const getStore = require('@common/store')

exports.getWindowSizeInfo = ({ windowSizeId = 1 } = {}) => {
  return windowSizeList.find(i => i.id === windowSizeId) || windowSizeList[0]
}

exports.getAppSetting = () => {
  return getStore('config').get('setting')
}

/** @returns { LxMusic.Common.DefaultHotKey } */
exports.getAppHotKeyConfig = () => {
  const electronStore_hotKey = getStore('hotKey')

  return {
    global: electronStore_hotKey.get('global'),
    local: electronStore_hotKey.get('local'),
  }
}

const saveHotKeyConfig = throttle(config => {
  for (const key of Object.keys(config)) {
    global.appHotKey.config[key] = config[key]
    getStore('hotKey').set(key, config[key])
  }
})

/**
 * 设置程序热键配置
 * @param { LxMusic.Common.DefaultHotKey } config
 */
exports.saveAppHotKeyConfig = config => {
  saveHotKeyConfig(config)
}

// const saveSetting = throttle(n => {
//   electronStore_config.set('setting', n)
// })

/**
 * 更新设置
 * @param { LxMusic.Common.Setting } settings
 */
exports.updateSetting = (settings) => {
  objectDeepMerge(global.appSetting, settings)
  getStore('config').set('setting', global.appSetting)
  exports.initSetting(false)
}

exports.initSetting = (isShowErrorAlert = true) => {
  const info = initSetting(isShowErrorAlert)
  global.appSetting = info.setting
  global.appSettingVersion = info.version
}
