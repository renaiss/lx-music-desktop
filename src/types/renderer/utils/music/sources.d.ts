import request from "request";

/** 歌曲资源 */
export type MusicSources = [
  { name: "酷我音乐"; id: "kw"; },
  { name: "酷狗音乐"; id: "kg"; },
  { name: "QQ音乐"; id: "tx"; },
  { name: "网易音乐"; id: "wy"; },
  { name: "咪咕音乐"; id: "mg"; },
  { name: "虾米音乐"; id: "xm"; },
]

/** 歌曲资源ID */
export type MusicSourcesId = MusicSources[number]["id"];

/** 音乐平台_临时搜索 */
export interface MusicPlatformTempSearch {
  /** 临时搜素 */ tempSearch: (str: string) => Promise<request.Response["body"]>;
  /** 处理结果 */ handleResult: (rawData: string[]) => string;
  /** 取消请求 */ cancelTempSearch: () => void;
  /** 搜素 */ search: (str: string) => Promise<string>;
}

/** 音乐平台_音乐搜索_结果 */
export interface MusicPlatformMusicSearchResult {
  /** 列表 */ list: LxMusic.UserApiEvent.SongInfo[];
  /** 页数 */ allPage: number;
  /** 总数 */ total: number;
  /** 显数 */ limit: number;
  /** 来源 */ source: MusicSourcesId;
}

/** 音乐平台_音乐搜索 */
export interface MusicPlatformMusicSearch {
  /** 显数 */ limit: number;
  /** 总数 */ total: number;
  /** 页面 */ page: number;
  /** 页数 */ allPage: number;
  /** 音乐搜索 */ musicSearch: (str: string, page: number, limit: number) => Promise<request.Response["body"]>;
  /** 处理结果 */ handleResult: (rawData: any) => LxMusic.UserApiEvent.SongInfo;
  /** 搜素 */ search: (str: string, page: number, limitInfo: { limit: string }, retryNum: number) => Promise<MusicPlatformMusicSearchResult>;
}

/** 音乐平台_排行榜_信息 */
export interface MusicPlatformLeaderboardInfo {
  /** 编号 */ id: number | string,
  /** 名称 */ name: string,
  /** 榜编号 */ bangid: number | string,
}

/** 音乐平台_排行榜_排行榜_信息 */
export interface MusicPlatformLeaderboardBoardsInfo {
  /** 排行榜列表 */ list: MusicPlatformLeaderboardInfo[];
  /** 来源 */ source: MusicSourcesId;
}

/** 音乐平台_排行榜 */
export interface MusicPlatformLeaderboard {
  /** 榜数据表 */ list: MusicPlatformLeaderboardInfo[];
  /** 取网址 */ getUrl: (...a: any[]) => string;
  /** 正则表 */ regExps: { [name in string]: RegExp; };
  /** 取榜单数据 */ getBoardsData: () => Promise<any>;
  /** 取数据 */ getData: (url: string) => Promise<any>;
  /** 过滤数据 */ filterData: (rawList: any) => LxMusic.UserApiEvent.SongInfo;
  /** 过滤榜单数据 */ filterBoardsData: (rawList: MusicPlatformLeaderboardInfo[]) => MusicPlatformLeaderboardInfo[];
  /** 取榜单 */ getBoards: (retryNum: string = 0) => MusicPlatformLeaderboardBoardsInfo;
  /** 取列表 */ getList: (id: string | number, page: number, ...args: any[]) => Promise<MusicPlatformMusicSearchResult>;
}

/** 音乐平台_歌曲信息 */
export interface MusicPlatformSongInfo {
  /** 编号 */ id: string;
  /** 名称 */ name: string;
}

/** 音乐平台_热门标签 */
export interface MusicPlatformHotTagInfo {
  /** 编号 */ id: string;
  /** 名称 */ name: string;
  /** 来源 */ source: MusicSourcesId;
}

/** 音乐平台_标签信息 */
export interface MusicPlatformTagInfo {
  /** 名称 */ name: string;
  /** 列表 */
  list: {
    /** 父编号 */ parent_id: string;
    /** 父名称 */ parent_name: string;
    /** 编号 */ id: string;
    /** 名称 */ name: string;
    /** 来源 */ source: MusicSourcesId;
  }[];
}

/** 音乐平台_过滤列表 */
export interface MusicPlatformFilterListInfo {
  /** 播放量 */ play_count: string;
  /** 编号 */ id: string;
  /** 歌手 */ author: string;
  /** 名称 */ name: string;
  /** 时间 */ time: number;
  /** 图片 */ img: string;
  /** 等级 */ grade: number;
  /** 描述 */ desc: string;
  /** 来源 */ source: MusicSourcesId;
}

/** 音乐平台_获取列表 */
export interface MusicPlatformGetListInfo {
  /** 列表 */ list: LxMusic.UserApiEvent.SongInfo[];
  /** 页面 */ page: number;
  /** 总数 */ total: number;
  /** 显数 */ limit: number;
  /** 来源 */ source: MusicSourcesId;
}

/** 音乐平台_获取标签 */
export interface MusicPlatformGetTagInfo {
  /** 来源 */ tags: MusicPlatformTagInfo[];
  /** 来源 */ hotTag: MusicPlatformHotTagInfo[];
  /** 来源 */ source: MusicSourcesId;
}


/** 音乐平台_明细信息 */
export interface MusicPlatformDetailInfo {
  /** 列表 */ list: string;
  /** 页面 */ page: string;
  /** 显数 */ limit: string;
  /** 总数 */ total: string;
  /** 来源 */ source: MusicSourcesId;
  /** 信息 */
  info: {
    /** 名称 */ name: string;
    /** 图片 */ img: string;
    /** 描述 */ desc: string;
    /** 歌手 */ author: string;
    /** 播放数 */ play_count: string;
  }
}

/** 音乐平台_歌曲列表 */
export interface MusicPlatformSongList {
  /** 排序列表 */ sortList: MusicPlatformSongInfo[];
  /** 正则表 */ regExps: { [name in string]: RegExp; };
  /** 过滤热门标签 */ filterInfoHotTag: (rawList: any[]) => MusicPlatformHotTagInfo[];
  /** 过滤标签信息 */ filterTagInfo: (rawList: any[]) => MusicPlatformTagInfo[];
  /** 过滤列表 */ filterList: (rawData: any[]) => MusicPlatformFilterListInfo[];
  /** 取列表 */ getList: (sortId: string, tagId: string, page: number) => Promise<MusicPlatformGetListInfo[]>;
  /** 取标签 */ getTags: () => Promise<MusicPlatformGetTagInfo[]>;
  /** 取明细 */ getListDetail: (id: string, page: number) => Promise<MusicPlatformDetailInfo[]>;
}

/** 音乐平台_热搜信息 */
export interface MusicPlatformHotSearchInfo {
  /** 来源 */ source: MusicSourcesId;
  /** 列表 */ list: string[];
}

/** 音乐平台_热门搜索 */
export interface MusicPlatformHotSearch {
  /** 过滤列表 */ filterList: (rawList: any[]) => string[];
  /** 取列表 */ getList: (rawList: any[]) => Promise<MusicPlatformHotSearchInfo[]>;
}

/** 音乐平台_过滤评论 */
export interface MusicPlatformFilterCommentInfo {
/** 编号 */ id: string;
/** 文本 */ text: string;
/** 时间 */ time: number;
/** 时间文本 */ timeStr: string;
/** 用户名 */ userName: string;
/** 头像 */ avatar: string;
/** 用户编号 */ userId: string;
/** 喜爱计数 */ likedCount: number;
/** 回复数 */ replyNum: number;
/** 回复 */ reply: string[];
}

/** 音乐平台_评论信息 */
export interface MusicPlatformCommentInfo {
  /** 来源 */ source: MusicSourcesId;
  /** 评论 */ comments: MusicPlatformFilterCommentInfo[];
  /** 总数 */ total: number;
  /** 显数 */ limit: number;
  /** 显数 */ limit: string;
  /** 页数 */ maxPage: string;
}

/** 音乐平台_评论系统 */
export interface MusicPlatformComment {
  /** 过滤评论 */ filterComment: (rawList: any[]) => MusicPlatformFilterCommentInfo[];
  /** 取评论 */ getComment: (...args: any[]) => Promise<MusicPlatformCommentInfo[]>;
}

/** 音乐平台_歌词信息 */
export interface MusicPlatformLyricInfo {
  /** 歌词 */ lyric: string;
  /** 歌词 */ tlyric: string;
  /** 歌词 */ lxlyric: string;
}

/** 音乐平台 */
export interface MusicPlatform {
  /** 临时搜索 */ tempSearch: MusicPlatformTempSearch;
  /** 音乐搜索 */ musicSearch: MusicPlatformMusicSearch;
  /** 排行榜 */ leaderboard: MusicPlatformLeaderboard;
  /** 音乐列表 */ songList: MusicPlatformSongList;
  /** 热门搜索 */ hotSearch: MusicPlatformHotSearch;
  /** 评论 */ comment: MusicPlatformComment;
  /** 获取歌词 */ getLyric: (songInfo: LxMusic.UserApiEvent.SongInfo, isGetLyricx: boolean) => LxMusic.Renderer.HttpPromoseResult<MusicPlatformLyricInfo>;
  /** 获取音乐网址 */ getMusicUrl: (songInfo: LxMusic.UserApiEvent.SongInfo, type: unknown) => string;
  /** 取音乐封面 */ getPic: (songInfo: LxMusic.UserApiEvent.SongInfo) => LxMusic.Renderer.HttpPromoseResult<string>;
  /** 取音乐明细网址 */ getMusicDetailPageUrl: (songInfo: LxMusic.UserApiEvent.SongInfo) => string;

  /** 初始化 */ init?: () => Promise<string>;
}

/** 音乐平台资源 */
export type MusicPlatformSources = { sources: MusicSources; } & { [source in MusicSourcesId]: MusicPlatform };
