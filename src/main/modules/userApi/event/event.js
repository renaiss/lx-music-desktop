const { EventEmitter } = require('events')
const USER_API_EVENT_NAME = require('./name')

/**
 * 用户接口事件
 * @extends { LxMusic.MainName.LxEventDataClass<"userApi"> }
 */
class UserApi extends EventEmitter {
  /**
   * 状态
   * @param { LxMusic.UserApi.StatusInfo } info 信息
   */
  status(info) {
    this.emit(USER_API_EVENT_NAME.status, info)
  }
}

module.exports = UserApi

