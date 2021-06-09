const { EventEmitter } = require('events')
const { tray: TRAY_EVENT_NAME } = require('./_name')

/**
 * 托盘事件
 * @extends { LxMusic.MainName.LxEventDataClass<"tray"> }
 */
class Tray extends EventEmitter {
  /** 创建 */
  create() {
    this.emit(TRAY_EVENT_NAME.create)
  }

  /** 销毁 */
  destroy() {
    this.emit(TRAY_EVENT_NAME.destroy)
  }
}

module.exports = Tray
