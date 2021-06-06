const { EventEmitter } = require('events')
const { mainWindow: MAIN_WINDOW_EVENT_NAME } = require('./_name')

/** 主窗口事件 */
class MainWindow extends EventEmitter {
  /** 设置歌词信息 */
  setLyricInfo(info) {
    this.emit(MAIN_WINDOW_EVENT_NAME.setLyricInfo, info)
  }

  /** 退出 */
  quit() {
    this.emit(MAIN_WINDOW_EVENT_NAME.quit)
  }

  /** 切换最小化 */
  toggleMinimize() {
    this.emit(MAIN_WINDOW_EVENT_NAME.toggle_minimize)
  }

  /** 切换隐藏 */
  toggleHide() {
    this.emit(MAIN_WINDOW_EVENT_NAME.toggle_hide)
  }

  /** 准备显示 */
  readyToShow() {
    this.emit(MAIN_WINDOW_EVENT_NAME.ready_to_show)
  }

  /** 显示 */
  show() {
    this.emit(MAIN_WINDOW_EVENT_NAME.show)
  }

  /** 隐藏 */
  hide() {
    this.emit(MAIN_WINDOW_EVENT_NAME.hide)
  }
}

module.exports = MainWindow
