/** 保存播放列表信息 */
export type SavePlayListInfo = {
  /** 类型 */ type: "myList";
  /** 数据 */
  data: {
    /** 默认列表 */ defaultList: unknown;
    /** 喜爱列表 */ loveList: unknown;
    /** 用户列表 */ userList: unknown;
  };
} | {
  /** 类型 */ type: "downloadList";
  /** 下载列表 */ data: unknown;
}

/** 播放列表信息 */
export interface PlayListInfo {
  /** 默认列表 */ defaultList: unknown;
  /** 喜爱列表 */ loveList: unknown;
  /** 用户列表 */ userList: unknown;
  /** 下载列表 */ downloadList: unknown;
}
