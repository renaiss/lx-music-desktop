/** 网络接口信息 */
export interface ApiInfo {
  /** 编号 */ id: `user_api_${number}_${number}`,
  /** 名称 */ name: string,
  /** 描述 */ description: string,
  /** 脚本 */ script: string,
}

/** 网络接口表信息 */
export interface GlobalUserApiMapInfo {
  getMusicUrl:
  (songInfo: LxMusic.UserApiEvent.SongInfo, type: LxMusic.Renderer.MusicQualityType)
    => Promise<LxMusic.Renderer.MusicPlatformMusicUrlInfo>;
}

/** 全局网络接口信息 */
export interface GlobalUserApiInfo {
  /** 列表 */ list: LxMusic.UserApi.ApiInfo[],
  /** 状态 */ status: boolean;
  /** 消息 */ message: string;
  /** 网络接口表 */ apis: LxMusic.Renderer.KVMap<LxMusic.Renderer.MusicSourcesId, GlobalUserApiMapInfo>,
}
