/** 状态信息 */
export type StatusInfo = {
  /** 状态 */ status: boolean;
  /** 网络接口信息 */ apiInfo: { [key in number]: LxMusic.UserApi.ApiInfo; } & LxMusic.UserApiEvent.InitInfo["sources"];
  /** 消息 */ message?: string;
}
