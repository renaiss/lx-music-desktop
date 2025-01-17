const LinePlayer = require('./line-player')
const FontPlayer = require('./font-player')

const fontTimeExp = /<(\d+),(\d+)>/g

/**
 * text
 */

module.exports = class Lyric {
  /**
   * @param { {
   * lyric?: string;
   * translationLyric?: string;
   * offset?: number;
   * lineClassName?: string;
   * fontClassName?: string;
   * translationClassName?: string;
   * activeLineClassName?: string;
   * lineModeClassName?: string;
   * shadowClassName?: string;
   * shadowContent?: boolean;
   * onPlay?: (line: number, text: string) => void;
   * onSetLyric?: (lines: FontPlayer[]) => void;
   * } } info
   */
  constructor({
    lyric = '',
    translationLyric = '',
    offset = 150,
    lineClassName = '',
    fontClassName = 'font',
    translationClassName = 'translation',
    activeLineClassName = 'active',
    lineModeClassName = 'line',
    shadowClassName = '',
    shadowContent = false,
    onPlay = function() { },
    onSetLyric = function() { },
  }) {
    this.lyric = lyric
    this.translationLyric = translationLyric
    this.offset = offset
    this.onPlay = onPlay
    this.onSetLyric = onSetLyric

    this.lineClassName = lineClassName
    this.fontClassName = fontClassName
    this.translationClassName = translationClassName
    this.activeLineClassName = activeLineClassName
    this.lineModeClassName = lineModeClassName
    this.shadowClassName = shadowClassName
    this.shadowContent = shadowContent

    this.playingLineNum = -1
    this.isLineMode = false
  }

  _init() {
    this.playingLineNum = -1
    this.isLineMode = false

    if (this.linePlayer) {
      this.linePlayer.setLyric(this.lyric, this.translationLyric)
    } else {
      this.linePlayer = new LinePlayer({
        lyric: this.lyric,
        translationLyric: this.translationLyric,
        offset: this.offset,
        onPlay: this._handleLinePlayerOnPlay,
        onSetLyric: this._handleLinePlayerOnSetLyric,
      })
    }
  }

  /**
   * @param { number } num
   * @param { string } text
   * @param { number } curTime
   */
  _handleLinePlayerOnPlay = (num, text, curTime) => {
    if (this.isLineMode) {
      if (num < this.playingLineNum + 1) {
        for (let i = this.playingLineNum; i > num - 1; i--) {
          const font = this._lineFonts[i]
          font.reset()
          font.lineContent.classList.remove(this.activeLineClassName)
        }
      } else if (num > this.playingLineNum + 1) {
        for (let i = Math.max(this.playingLineNum, 0); i < num; i++) {
          const font = this._lineFonts[i]
          font.reset()
          font.lineContent.classList.remove(this.activeLineClassName)
        }
      } else if (this.playingLineNum > -1) {
        const font = this._lineFonts[this.playingLineNum]
        font.reset()
        font.lineContent.classList.remove(this.activeLineClassName)
      }
    } else {
      if (num < this.playingLineNum + 1) {
        for (let i = this.playingLineNum; i > num - 1; i--) {
          const font = this._lineFonts[i]
          font.lineContent.classList.remove(this.activeLineClassName)
          font.reset()
        }
      } else if (num > this.playingLineNum + 1) {
        for (let i = Math.max(this.playingLineNum, 0); i < num; i++) {
          const font = this._lineFonts[i]
          font.lineContent.classList.remove(this.activeLineClassName)
          font.finish()
        }
      } else if (this.playingLineNum > -1) {
        const font = this._lineFonts[this.playingLineNum]
        font.lineContent.classList.remove(this.activeLineClassName)
      }
    }
    this.playingLineNum = num
    const font = this._lineFonts[num]
    font.lineContent.classList.add(this.activeLineClassName)
    font.play(curTime - this._lines[num].time)
    this.onPlay(num, this._lines[num].text)
  }

  _handleLinePlayerOnSetLyric = lyricLines => {
    // console.log(lyricLines)
    // this._lines = lyricsLines
    this.isLineMode = lyricLines.length && !/^<\d+,\d+>/.test(lyricLines[0].text)

    this._lineFonts = []
    if (this.isLineMode) {
      this._lines = lyricLines.map(line => {
        const fontPlayer = new FontPlayer({
          lyric: line.text,
          translationLyric: line.translation,
          lineClassName: this.lineClassName,
          fontClassName: this.fontClassName,
          translationClassName: this.translationClassName,
          lineModeClassName: this.lineModeClassName,
          shadowClassName: this.shadowClassName,
          shadowContent: this.shadowContent,
        })

        this._lineFonts.push(fontPlayer)
        return {
          text: line.text,
          time: line.time,
          dom_line: fontPlayer.lineContent,
        }
      })
    } else {
      this._lines = lyricLines.map(line => {
        const fontPlayer = new FontPlayer({
          lyric: line.text,
          translationLyric: line.translation,
          lineClassName: this.lineClassName,
          fontClassName: this.fontClassName,
          translationClassName: this.translationClassName,
          shadowClassName: this.shadowClassName,
          shadowContent: this.shadowContent,
        })

        this._lineFonts.push(fontPlayer)
        return {
          text: line.text.replace(fontTimeExp, ''),
          time: line.time,
          translation: line.translation,
          dom_line: fontPlayer.lineContent,
        }
      })
    }

    this.onSetLyric(this._lines)
  }

  /**
   * 播放
   * @param { number } curTime
   */
  play(curTime) {
    if (!this.linePlayer) return
    this.linePlayer.play(curTime)
  }

  pause() {
    if (!this.linePlayer) return
    this.linePlayer.pause()
    if (this.playingLineNum > -1) this._lineFonts[this.playingLineNum].pause()
  }

  /**
   * 设置歌词
   * @param { string } lyric
   * @param { string } translationLyric
   */
  setLyric(lyric, translationLyric) {
    this.lyric = lyric
    this.translationLyric = translationLyric
    this._init()
  }
}
