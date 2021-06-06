const Event = require('./event/event')
const eventNames = require('./event/name')
const { closeWindow } = require('./main')
const { getUserApis, importApi, removeApi } = require('./utils')
const { request, cancelRequest, getStatus, loadApi } = require('./rendererEvent/rendererEvent')

// const { getApiList, importApi, removeApi, setApi, getStatus, request, eventNames }
let userApiId

exports.Event = Event
exports.eventNames = eventNames
exports.getApiList = getUserApis

/**
 * 引入网络接口
 * @param { string } script 脚本
 */
exports.importApi = script => {
  return {
    apiInfo: importApi(script),
    apiList: getUserApis(),
  }
}

exports.request = request
exports.cancelRequest = cancelRequest
exports.getStatus = getStatus

/**
 * 删除网络接口
 * @param { LxMusic.UserApi.ApiInfo["id"][] } ids 编号组
 * @returns
 */
exports.removeApi = async ids => {
  if (userApiId && ids.includes(userApiId)) {
    userApiId = null
    await closeWindow()
  }
  removeApi(ids)
  return getUserApis()
}

/**
 * 设置网络接口
 * @param { LxMusic.UserApi.ApiInfo["id"] } id 编号
 */
exports.setApi = async id => {
  if (userApiId) {
    userApiId = null
    await closeWindow()
  }
  const apiList = getUserApis()
  if (!apiList.some(a => a.id === id)) return
  userApiId = id
  await loadApi(id)
}


