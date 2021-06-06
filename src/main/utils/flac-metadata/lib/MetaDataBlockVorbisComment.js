const MetaDataBlock = require('./MetaDataBlock')

/** 音频评论元数据块 */
class MetaDataBlockVorbisComment extends MetaDataBlock {
  /**
   * 创建音频评论元数据块
   * @param { boolean } isLast 是最后一项
   */
  constructor(isLast) {
    super(isLast, 4)

    /** 卖方 */ this.vendor = ''
    /** 评论 */ this.comments = []
  }

  /**
   * 创建音频评论元数据块
   * @param { boolean } isLast 是最后一项
   * @param { string } vendor 卖方
   * @param { string[] } comments 评论
   * @returns
   */
  static create(isLast, vendor, comments) {
    let mdb = new MetaDataBlockVorbisComment(isLast)
    mdb.vendor = vendor
    mdb.comments = comments
    mdb.hasData = true
    return mdb
  }

  /**
   * @override
   * @param { Buffer } buffer 数据
   */
  parse(buffer) {
    try {
      let pos = 0

      let vendorLen = buffer.readUInt32LE(pos)
      let vendor = buffer.toString('utf8', pos + 4, pos + 4 + vendorLen)
      this.vendor = vendor
      pos += 4 + vendorLen

      let commentCount = buffer.readUInt32LE(pos)
      pos += 4

      while (commentCount-- > 0) {
        let commentLen = buffer.readUInt32LE(pos)
        let comment = buffer.toString('utf8', pos + 4, pos + 4 + commentLen)
        this.comments.push(comment)
        pos += 4 + commentLen
      }

      this.hasData = true
    } catch (e) {
      this.error = e
      this.hasData = false
    }
  }

  /** 公布 */
  publish() {
    let pos = 0
    let size = this.getSize()
    let buffer = Buffer.alloc(4 + size)

    let header = size
    header |= (this.type << 24)
    header |= (this.isLast ? 0x80000000 : 0)
    buffer.writeUInt32BE(header >>> 0, pos)
    pos += 4
    let vendorLen = Buffer.byteLength(this.vendor)
    buffer.writeUInt32LE(vendorLen, pos)
    buffer.write(this.vendor, pos + 4)
    pos += 4 + vendorLen

    let commentCount = this.comments.length
    buffer.writeUInt32LE(commentCount, pos)
    pos += 4

    for (let i = 0; i < commentCount; i++) {
      let comment = this.comments[i]
      let commentLen = Buffer.byteLength(comment)
      buffer.writeUInt32LE(commentLen, pos)
      buffer.write(comment, pos + 4)
      pos += 4 + commentLen
    }

    return buffer
  }

  /** 取大小 */
  getSize() {
    let size = 8 + Buffer.byteLength(this.vendor)
    for (let i = 0; i < this.comments.length; i++) {
      size += 4 + Buffer.byteLength(this.comments[i])
    }
    return size
  }

  /** @override */
  toString() {
    let str = '[MetaDataBlockVorbisComment]'
    str += ' type: ' + this.type
    str += ', isLast: ' + this.isLast
    if (this.error) {
      str += '\n  ERROR: ' + this.error
    }
    if (this.hasData) {
      str += '\n  vendor: ' + this.vendor
      if (this.comments.length) {
        str += '\n  comments:'
        for (let i = 0; i < this.comments.length; i++) {
          str += '\n    ' + this.comments[i].split('=').join(': ')
        }
      } else {
        str += '\n  comments: none'
      }
    }
    return str
  }
}

module.exports = MetaDataBlockVorbisComment
