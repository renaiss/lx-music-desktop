/** 保存播放列表信息 */
export type SavePlayListInfo = {
  /** 类型 */ type: "myList";
  /** 数据 */
  data: {
    /** 默认列表 */ defaultList: LxMusic.Renderer.PlayListInfo;
    /** 喜爱列表 */ loveList: LxMusic.Renderer.PlayListInfo;
    /** 用户列表 */ userList: LxMusic.Renderer.PlayListInfo;
  };
} | {
  /** 类型 */ type: "downloadList";
  /** 下载列表 */ data: LxMusic.Renderer.PlayListInfo;
}

/** 播放列表列表信息 */
export interface PlayListListInfo {
  /** 默认列表 */ defaultList: LxMusic.Renderer.PlayListInfo;
  /** 喜爱列表 */ loveList: LxMusic.Renderer.PlayListInfo;
  /** 用户列表 */ userList: LxMusic.Renderer.PlayListInfo;
  /** 下载列表 */ downloadList: LxMusic.Renderer.PlayListInfo;
}
