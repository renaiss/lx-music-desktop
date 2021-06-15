
export interface SaveDataPlayInfo {
  /** 时间 */ time: number;
  /** 序号 */ index: number;
  /** 最大时间 */ maxTime: number,
  /** 列表编号 */ listId: "download" | "play",
  /** 序号 */ list: (LxMusic.Renderer.SongInfo | LxMusic.Renderer.DownloadInfo)[] | null,
}

/** 保存数据信息 */
export type SaveDataInfo = {
  /** 路径 */ path: "searchHistoryList";
  /** 数据 */ data: string[];
} | {
  path: "playInfo";
  data: SaveDataPlayInfo;
} | {
  path: undefined;
  data: string
}

