const { EventEmitter } = require('events')
const { common: COMMON_EVENT_NAME } = require('./_name')

/**
 * 普通事件
 * @extends { LxMusic.MainName.LxEventDataClass<"common"> }
 */
class Common extends EventEmitter {
  /** 初始化设置 */
  initSetting() {
    this.emit(COMMON_EVENT_NAME.initConfig)
    this.configStatus(null)
  }

  /**
   * 配置状态
   * @param { string } name
   */
  configStatus(name) {
    this.emit(COMMON_EVENT_NAME.configStatus, name)
  }
}

module.exports = Common

