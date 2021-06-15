/** 播放器动作 */
export type ListButtonActionType = "play" |
  "listAdd" |
  "download" |
  "add" |
  "start" |
  "pause" |
  "file" |
  "search" |
  "remove";

export interface ListButtonHandleInfo {
  action: ListButtonActionType;
  index: number;
}

export type ListButtonHandle = (info: ListButtonHandleInfo) => void;
