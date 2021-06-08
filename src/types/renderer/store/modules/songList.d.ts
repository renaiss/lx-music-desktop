/** 歌曲列表明细信息 */
export interface SongListDetailInfo {
  /** 列表 */ list: [];
  /** 描述 */ desc: string;
  /** 总数 */ total: number
  /** 页面 */ page: number;
  /** 显数 */ limit: number;
  /** 关键 */ key: string;
  /** 信息 */ info: LxMusic.Renderer.MusicPlatformDetailInfo["info"];
}

/** 歌曲列表缓存列表 */
export type SongListCacheMap = Map<LxMusic.Renderer.MusicSourcesId, LxMusic.Renderer.MusicPlatformDetailInfo>;

/** 歌曲列表数据 */
export interface SongListState {
  /** 标签 */ tags: { [id in LxMusic.Renderer.MusicSourcesId]: LxMusic.Renderer.MusicPlatformTagInfo; };
  /** 列表 */ list: LxMusic.Renderer.LeaderboardState;
  /** 列表明细 */ listDetail: SongListDetailInfo;
  /** 选择列表信息 */ selectListInfo: LxMusic.Renderer.MusicPlatformDetailInfo["info"];
  /** 要隐藏信息 */ isVisibleListDetail: boolean;
}

/** 歌曲列表动作内容 */
export type SongListActionContext = LxMusic.Renderer.ActionContext<"songList", SongListState>;

/** 歌曲列表排序表 */
export type SortListSortMap = { [id in LxMusic.Renderer.MusicSourcesId]: LxMusic.Renderer.MusicPlatformSongInfo[]; };

/** 歌曲列表取明细信息 */
export interface SongListGetDetailInfo {
  /** 结果 */ result: LxMusic.Renderer.MusicPlatformDetailInfo;
  /** 关键 */ key: string;
  /** 来源 */ source: LxMusic.Renderer.MusicSourcesId;
  /** 编号 */ id: string;
  /** 页面 */ page: number;
}
