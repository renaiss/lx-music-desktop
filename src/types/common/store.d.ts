/** 存储播放列表信息 */
export interface StorePlayListInfo {
  /** 默认列表 */ defaultList: LxMusic.Renderer.PlayListInfo;
  /** 喜爱列表 */ loveList: LxMusic.Renderer.PlayListInfo;
  /** 用户列表 */ userList: LxMusic.Renderer.PlayListInfo;
}

/** 存储下载列表信息 */
export interface StoreDownloadListInfo {
  list: LxMusic.Renderer.PlayListInfo;
}

/** 储存数据信息 */
export interface StoreDataInfo {
  /** 搜索历史 */ searchHistoryList: string[];
  /** 播放信息 */
  playInfo: {
    /** 列表编号 */ listId: number;
    /** 序号 */ index: number;
  };
}

/** 存储表 */
export interface StoreDataMap {
  /** 播放列表 */ playList: StorePlayListInfo;
  /** 配置 */ config: LxMusic.Common.Setting;
  /** 下载列表 */ downloadList: StoreDownloadListInfo;
  /** 热键 */ hotKey: LxMusic.Common.DefaultHotKey;
  /** 用户脚本 */ userApi: LxMusic.UserApi.ApiInfo[];
  /** 数据 */ data: StoreDataInfo;
  /** 歌词 */ lyrics: { [id in LxMusic.Renderer.MusicSourcesId]: LxMusic.Renderer.MusicPlatformLyricInfo; };
  /** 音乐路径组 */ musicUrls: { [id in LxMusic.Renderer.MusicSourcesId]: string; };
}

export type GetStoreFunc = <T extends keyof StoreDataMap>(name: T, isIgnoredError: boolean, isShowErrorAlert: boolean) => import("electron-store") <LxMusic.Common.StoreDataMap[T]>;
