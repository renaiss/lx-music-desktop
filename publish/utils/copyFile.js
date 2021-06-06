const fs = require('fs')
const chalk = require('chalk')
const { jp, copyFile } = require('./index')

const buildDir = '../../build'

/** 取打包文件名 */
const getBuildFileName = () => {
  /** @type { string[] } */
  const names = []
  const pathRegExp = [
    /latest\.yml$/,
    /\.exe$/,
    /\.blockmap$/,
  ]
  const files = fs.readdirSync(jp(buildDir), 'utf8')
  files.forEach(name => {
    pathRegExp.forEach(regexp => {
      if (regexp.test(name)) names.push(name)
    })
  })
  return names
}

/**
 * 复制
 * @param { string[] } names 复制名称
 */
const copy = names => {
  const tasks = names.map(name => copyFile(jp(buildDir, name), jp('../assets', name)))
  return Promise.all(tasks)
}

/**
 * 复制文件
 * @param { boolean } isCopyVersion 要复制版本
 */
module.exports = (isCopyVersion = true) => {
  copy(getBuildFileName()).then(() => {
    if (isCopyVersion) fs.writeFileSync(jp('../assets/version.json'), JSON.stringify(require('../version.json')), 'utf8')
  }).catch(err => {
    console.log(err)
    console.log(chalk.red('File copy failed.'))
    return Promise.reject(err)
  })
}
