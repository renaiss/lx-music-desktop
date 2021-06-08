/** 保存数据信息 */
export type SaveDataInfo = {
  /** 路径 */ path: "searchHistoryList";
  /** 数据 */ data: string[];
} | {
  path: "playInfo";
  data: {
    /** 列表编号 */ listId: number;
    /** 序号 */ index: number;
  };
} | {
  path: undefined;
  data: string
}

