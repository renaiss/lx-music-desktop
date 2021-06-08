const Store = require('electron-store')
const { dialog, app, shell } = require('electron')
const path = require('path')
const fs = require('fs')
const log = require('electron-log')

/**
 * 数据表
 * @type { { [name: string]: Store } }
 */
const stores = {}

/**
 * 按名称获取数据
 * @type { LxMusic.Common.GetStoreFunc }
 */
module.exports = (name, isIgnoredError = true, isShowErrorAlert = true) => {
  if (stores[name]) return stores[name]
  let store
  try {
    store = stores[name] = new Store({ name, clearInvalidConfig: false })
  } catch (error) {
    log.error(error)

    if (!isIgnoredError) throw error


    const backPath = path.join(app.getPath('userData'), name + '.json.bak')
    fs.copyFileSync(path.join(app.getPath('userData'), name + '.json'), backPath)
    if (isShowErrorAlert) {
      dialog.showMessageBoxSync({
        type: 'error',
        message: name + ' data load error',
        detail: `We have helped you back up the old ${name} file to: ${backPath}\nYou can try to repair and restore it manually\n\nError detail: ${error.message}`,
      })
      shell.showItemInFolder(backPath)
    }


    store = new Store({ name, clearInvalidConfig: true })
  }
  return store
}
