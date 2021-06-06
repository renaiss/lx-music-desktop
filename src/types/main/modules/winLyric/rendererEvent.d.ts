/** 窗口边界信息 */
export interface WinBoundsInfo {
  /** 横坐标 */ x: number;
  /** 纵坐标 */ y: number;
  /** 宽度 */ w: number;
  /** 高度 */ h: number;
}

/** 歌词行为信息  */
export type LyricActionInfo = "status" | "info"
