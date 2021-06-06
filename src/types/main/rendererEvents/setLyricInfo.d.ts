/** 歌词信息 */
export type LyricInfo = {
  /** 类型 */ type: "info";
  /** 数据 */
  data: {
    songmid: unknown;
    singer: unknown;
    name: unknown;
    album: unknown;
    lrc: unknown;
    tlrc: unknown;
    lxlrc: unknown;
    isPlay: unknown;
    line: unknown;
    played_time: unknown;
  };
} | {
  type: "status";
  data: {
    isPlay: unknown;
    line: unknown;
    played_time: unknown;
  };
} | {
  type: "music_info";
  data: {
    songmid: unknown;
    singer: unknown;
    name: unknown;
    album: unknown;
  };
} | {
  type: "play";
  data: number;
} | {
  type: "pause";
  data: undefined;
} | {
  type: "lyric";
  data: {
    lrc: unknown;
    tlrc: unknown;
    lxlrc: unknown;
  };
} | {
  type: "lines";
  data: number[];
} | {
  type: "line";
  data: number;
}

/** 设置歌词信息 */
export interface LyricInfoInfo {
    /** 名称 */ name: LxMusic.Common.IpcNameMap["winLyric"]["set_lyric_info"];
    /** 形式 */ modal: "lyricWindow";
    /** 行为 */ action: "status" | "info"
}

/** 设置歌词信息 */
export type SetLyricInfo = LyricInfo & { /** 信息 */ info: LyricInfoInfo; }
