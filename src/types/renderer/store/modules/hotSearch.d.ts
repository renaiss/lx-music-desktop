/** 搜索资源 */
export type SearchSources = [
  ...LxMusic.Renderer.MusicSources,
  { name: "聚合搜索"; id: "all"; },
]

/** 搜索类型 */
export type SearchType = SearchSources[number]["id"];

/** 搜索表 */
export type SearchMap = { [id in SearchSources[number]["id"]]: string[] }

/** 歌曲表 */
export type MusicSourcesMap = { [id in LxMusic.Renderer.MusicSourcesId]: string[] }

/** 热搜数据 */
export interface HotSearchState {
  /** 搜索列表 */ list: SearchMap;
}

/** 热搜设置列表信息 */
export interface HotSearchSetListInfo {
  /** 来源 */ source: LxMusic.Renderer.MusicSourcesId;
  /** 数据 */ data: string[];
  /** 列表 */ list: string[];
}

/** 热搜动作内容 */
export type HotSearchActionContext = LxMusic.Renderer.ActionContext<"hotSearch", HotSearchState>;
