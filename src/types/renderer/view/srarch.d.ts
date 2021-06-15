export type SearchActionType = "play" | "download" | "playLater" | "addTo" | "sourceDetail";

export type SearchMenuConfig = LxMusic.View.MenuInfoConfig<SearchActionType>;

export type SearchMenuInfo = LxMusic.Renderer.MenuInfo<SearchActionType>;

/** 搜索数据 */
export interface sourceListInfo {
  /** 列表 */ list: LxMusic.UserApiEvent.SongInfo[];
  /** 页面 */ page: number;
  /** 页数 */ allPage: number;
  /** 显数 */ limit: number;
  /** 总数 */ total: number;
  /** 最大页数表 */ sourceMaxPage?: LxMusic.Renderer.SearchSourceMaxPageMap;
}
