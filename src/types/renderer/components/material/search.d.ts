/** 搜索发送事件类型 */
export type SearchSendEventType = "change" |
  "listClick" |
  "focus" |
  "blur" |
  "submit" |
  "hide";

/** 歌曲排序信息 */
export interface SongInfoSortInfo {
  /** 名称值 */ num: number;
  /** 数据 */ data: LxMusic.UserApiEvent.SongInfo;
}
