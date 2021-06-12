/** 播放器明细元素信息 */
export type PlayerDetailDomLineInfo = HTMLElement;

/** 播放器明细行信息 */
export interface PlayerDetailLinesInfo {
  /** 歌词行元素 */ dom_line: PlayerDetailDomLineInfo;
}

/** 播放器明细歌词信息 */
export interface PlayerDetailLyricInfo {
  /** 行数 */ line: number;
  /** 内容 */ text: string;
  /** 行元素组 */ lines: PlayerDetailLinesInfo[];
}

/** 播放器明细播放信息 */
export interface PlayerDetailPlayInfo {
  /** 播放时间文本 */ nowPlayTimeStr: string;
  /** 最大播放时间文本 */ maxPlayTimeStr: string;
  /** 进度 */ progress: number;
  /** 播放事件 */ nowPlayTime: number;
  /** 状态 */ status: number;
}
