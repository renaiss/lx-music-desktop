const { EventEmitter } = require('events')
const { hotKey: HOT_KEY_EVENT_NAME } = require('./_name')
const { saveAppHotKeyConfig } = require('../utils')

/** 热键事件 */
class HotKey extends EventEmitter {
  /** 初始化 */
  init() {
    this.emit(HOT_KEY_EVENT_NAME.init)
  }

  /**
   * 保存配置
   * @param { any } config
   * @param { any } source
   */
  saveConfig(config, source) {
    if (config) saveAppHotKeyConfig(config)
    this.emit(HOT_KEY_EVENT_NAME.config, config, source)
  }

  /**
   * 按键按下
   * @param { { type: string; key: string; } } info 信息
   */
  keyDown(info) {
    this.emit(HOT_KEY_EVENT_NAME.keyDown, info)
  }
}

module.exports = HotKey

