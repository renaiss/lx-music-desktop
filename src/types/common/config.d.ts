/** 窗口规格信息 */
export interface WindowSizeInfo {
  /** 编号 */ id: number;
  /** 名称 */ name: "small" | "smaller" | "medium" | "big" | "larger" | "oversized" | "huge";
  /** 宽度 */ width: number;
  /** 高度 */ height: number;
  /** 文字大小 */ fontSize: `${number}px`;
}

/** 窗口规格信息 */
export interface WindiwConfig {
  /** 窗口规格列表 */ windowSizeList: WindowSizeInfo[];
  /** 导航网址白名单 */ navigationUrlWhiteList: RegExp[];
}
