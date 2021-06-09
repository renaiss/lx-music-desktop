const { EventEmitter } = require('events')
const { hotKey: HOT_KEY_EVENT_NAME } = require('./_name')
const { saveAppHotKeyConfig } = require('../utils')

/**
 * 热键事件
 * @extends { LxMusic.MainName.LxEventDataClass<"hotKey"> }
 */
class HotKey extends EventEmitter {
  /** 初始化 */
  init() {
    this.emit(HOT_KEY_EVENT_NAME.init)
  }

  /**
   * 保存配置
   * @param { LxMusic.Renderer.HotKeyConfigInfo["config"] } config
   * @param { LxMusic.Renderer.HotKeyConfigInfo["source"] } source
   */
  saveConfig(config, source) {
    if (config) saveAppHotKeyConfig(config)
    this.emit(HOT_KEY_EVENT_NAME.config, config, source)
  }

  /**
   * 按键按下
   * @param { LxMusic.Renderer.KeyDownInfo } info 信息
   */
  keyDown(info) {
    this.emit(HOT_KEY_EVENT_NAME.keyDown, info)
  }
}

module.exports = HotKey

