const fs = require('fs')
const path = require('path')

/**
 * 合并
 * @param  { string[] } p 被合并项
 */
exports.jp = (...p) => p.length ? path.join(__dirname, ...p) : __dirname

/**
 * 复制文件
 * @param { string } source 源地址
 * @param { string } target 目标地址
 * @returns { Promise<void> }
 */
exports.copyFile = (source, target) => new Promise((resolve, reject) => {
  const rd = fs.createReadStream(source)
  rd.on('error', err => reject(err))
  const wr = fs.createWriteStream(target)
  wr.on('error', err => reject(err))
  wr.on('close', () => resolve())
  rd.pipe(wr)
})

/**
 * 时间格式化
 * @param { Date } date 格式化的时间
 * @param { boolean } isFromatData 格式化为时间[否为日期]
 */
exports.formatTime = (date, isFromatData) => {
  const _date = date == null ? new Date() : typeof date == 'string' ? new Date(date) : date
  const year = _date.getFullYear()
  const month = fm(_date.getMonth() + 1)
  const day = fm(_date.getDate())
  if (!isFromatData) return year + '-' + month + '-' + day
  return year + '-' + month + '-' + day + ' ' + fm(_date.getHours()) + ':' + fm(_date.getMinutes()) + ':' + fm(_date.getSeconds())
}

/**
 * 格式化日期值
 * @param { number } value 值
 * @returns { `${number}` }
 */
function fm(value) {
  if (value < 10) return '0' + value
  return value
}

/**
 * 格式化大小
 * @param { number } size 大小
 * @returns { `${number}${'b'|'kB'|'MB'|'GB'|'TB'}` }
 */
exports.sizeFormate = size => {
  // https://gist.github.com/thomseddon/3511330
  if (!size) return '0 b'
  let units = ['b', 'kB', 'MB', 'GB', 'TB']
  let number = Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / Math.pow(1024, Math.floor(number))).toFixed(2)} ${units[number]}`
}

/**
 * 格式化程序参数
 * @param { LxMusic.Publish.ArgvParams } argv
 */
exports.parseArgv = argv => {
  const params = {}
  argv.forEach(item => {
    const argv = item.split('=')
    switch (argv[0]) {
      case 'ver':
        params.ver = argv[1]
        break
      case 'draft':
        params.isDraft = argv[1] === 'true' || argv[1] === undefined
        break
      case 'prerelease':
        params.isPrerelease = argv[1] === 'true' || argv[1] === undefined
        break
      case 'target_commitish':
        params.target_commitish = argv[1]
        break
    }
  })
  return params
}
