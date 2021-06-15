/** 发送行为数据表 */
export type SendActionDataMap<T> = { [A in keyof T]: { action: A; data: T[A]; } }[keyof T];

/** 发送事件 */
export type SendEvent<T> = <A extends keyof T>(action: A, data?: T[A]) => void;

/** 发送事件处理 */
export type SendEventHandle<T> = (info: SendActionDataMap<T>) => void;



export interface SongInfoSortInfo {
  /** 名称值 */ num: number;
  /** 数据 */ data: LxMusic.UserApiEvent.SongInfo;
}

/** 搜索发送行为数据 */
export interface SearchListSendActionData {
  listClick: { index: number; isPlay: boolean; };

  hide: never;
}

/** 搜索列表发送事件 */
export type SearchListSendEvent = SendEvent<SearchListSendActionData>;

/** 搜索列表发送事件处理 */
export type SearchListSendEventHanlde = SendEventHandle<SearchListSendActionData>;
