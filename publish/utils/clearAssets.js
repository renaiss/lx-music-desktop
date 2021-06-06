const del = require('del')
// const copyFile = require('./copyFile')

/** 清除资源 */
module.exports = () => {
  del.sync(['publish/assets/*'])
  // return copyFile(false)
}

