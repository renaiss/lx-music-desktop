/** 搜素排序信息 */
export interface SearchSortInfo {
  /**  */ num: number;
  /** 歌曲信息 */ data: LxMusic.UserApiEvent.SongInfo;
}

/** 搜素最大页数表 */
export type SearchSourceMaxPageMap = { [id in LxMusic.Renderer.MusicSourcesId]: number; };

/** 搜素页数信息表 */
export type SearchSourcePageInfoMap = { [id in LxMusic.Renderer.MusicSourcesId]: LxMusic.Renderer.MusicPlatformMusicSearchResult; };

/** 搜索数据 */
export interface SearchState {
  /** 页数信息表 */ sourceList: SearchSourcePageInfoMap;
  /** 列表 */ list: LxMusic.UserApiEvent.SongInfo[];
  /** 文本 */ text: string;
  /** 页面 */ page: number;
  /** 显数 */ limit: number;
  /** 页数 */ allPage: number;
  /** 总数 */ total: number;
  /** 最大页数表 */ sourceMaxPage: SearchSourceMaxPageMap;
  /** 历史列表 */ historyList: string[];
}

/** 搜索动作内容 */
export type SearchActionContext = LxMusic.Renderer.ActionContext<"search", SearchState>

/** 搜索结果列表信息 */
export interface SearchResultListInfo {
  /** 结果列表 */ results:LxMusic.Renderer.MusicPlatformMusicSearchResult[];
  /** 页面 */ page:number;
}
