const path = require('path')
const mp3Meta = require('./mp3Meta')
const flacMeta = require('./flacMeta')

/**
 * 设置元数据
 * @param { string } filePath 文件路径
 * @param { any } meta 元数据 // TODO 未知
 */
exports.setMeta = (filePath, meta) => {
  switch (path.extname(filePath)) {
    case '.mp3':
      mp3Meta(filePath, meta)
      break
    case '.flac':
      flacMeta(filePath, meta)
      break
  }
}
