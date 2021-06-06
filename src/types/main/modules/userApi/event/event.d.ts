/** 状态信息 */
export type StatusInfo = {
  /** 状态 */ status: false,
  /** 网络接口信息 */ apiInfo?: LxMusic.UserApi.ApiInfo[],
  /** 消息 */ message: string;
} | {
  status: true,
  apiInfo: { [key in number]: LxMusic.UserApi.ApiInfo; } & { sources: LxMusic.Common.IpcMainInfo<LxMusic.UserApiEvent.InitInfo> }
  message: undefined;
}
