/**
 * 元数据块
 * @abstract
 */
class MetaDataBlock {
  /**
   * 创建元数据块
   * @param { boolean } isLast 是最后一项
   * @param { string } type 类型
   */
  constructor(isLast, type) {
    /** 是最后一项 */ this.isLast = isLast
    /** 类型 */ this.type = type
    /** 错误 */ this.error = null
    /** 有数据 */ this.hasData = false
    /** 已移除 */ this.removed = false
  }

  /** 移除 */
  remove() {
    this.removed = true
  }

  /**
   * 格式化
   * @param { Buffer } buffer 数据
   * @abstract
   */
  parse(buffer) {
  }

  /** @override */
  toString() {
    let str = '[MetaDataBlock]'
    str += ' type: ' + this.type
    str += ', isLast: ' + this.isLast
    return str
  }
}

module.exports = MetaDataBlock
