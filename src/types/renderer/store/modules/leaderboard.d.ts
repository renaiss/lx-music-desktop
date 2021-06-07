/** 排行榜数据 */
export interface LeaderboardState {
  /** 排行榜 */ boards: LxMusic.Renderer.MusicSourcesMap;
  /** 列表 */ list: LxMusic.UserApiEvent.SongInfo[];
  /** 总页 */ total: number;
  /** 页数 */ page: number;
  /** 个数 */ limit: number;
  /** 关键 */ key: string;
}

/** 排行榜模块 */
export type LeaderboardModule = import("Vuex").Module<LeaderboardState, { setting: LxMusic.Common.Setting; }>;

/** 排行榜内容 */
export type LeaderboardActionContext = import("Vuex").ActionContext<LeaderboardState, { setting: LxMusic.Common.Setting; }>;

/** 排行榜设置信息 */
export interface LeaderboardSetInfo{
  /** 排行榜 */ boards:LxMusic.Renderer.MusicSourcesMap;
  /** 资源 */ source:LxMusic.Renderer.MusicSources;
  /** 结果 */ result:LeaderboardState;
  /** 关键 */ key:string;
}

/** 排行缓存表 */
export type LeaderboardCacheMap = Map<string, LxMusic.Renderer.MusicPlatformMusicSearchResult>;
