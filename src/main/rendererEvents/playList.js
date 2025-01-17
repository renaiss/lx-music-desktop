const { mainOn, NAMES: { mainWindow: ipcMainWindowNames }, mainHandle } = require('../../common/ipc')
const getStore = require('@common/store')


mainHandle(ipcMainWindowNames.get_playlist, async(event, isIgnoredError = false) => {
  const electronStore_list = getStore('playList', isIgnoredError, false)

  return {
    defaultList: electronStore_list.get('defaultList'),
    loveList: electronStore_list.get('loveList'),
    userList: electronStore_list.get('userList'),
    downloadList: getStore('downloadList').get('list'),
  }
})

const handleSaveList = ({ defaultList, loveList, userList }) => {
  let data = {}
  if (defaultList != null) data.defaultList = defaultList
  if (loveList != null) data.loveList = loveList
  if (userList != null) data.userList = userList
  getStore('playList').set(data)
}
mainOn(ipcMainWindowNames.save_playlist, (event, info) => {
  switch (info.type) {
    case 'myList':
      handleSaveList(info.data)
      break
    case 'downloadList':
      getStore('downloadList').set('list', info.data)
      break
  }
})
