const { EventEmitter } = require('events')
const { winLyric: WIN_LYRIC_EVENT_NAME } = require('./_name')
// const { updateSetting } = require('../utils')

/**
 * 桌面歌词事件
 * @extends { LxMusic.MainName.LxEventDataClass<"winLyric"> }
 */
class WinLyric extends EventEmitter {
  /** 创建 */
  create() {
    this.emit(WIN_LYRIC_EVENT_NAME.create)
  }

  /** 关闭 */
  close() {
    this.emit(WIN_LYRIC_EVENT_NAME.close)
  }
}

module.exports = WinLyric
