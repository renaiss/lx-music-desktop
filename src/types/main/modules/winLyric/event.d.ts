/** 歌词配置信息 */
export interface LyricConfigInfo {
  /** 歌词配置 */ config: LxMusic.Common.DesktopLyric;
  /** 语言编号 */ languageId: string | number;
  /** 显示歌词翻译 */ isShowLyricTranslation: boolean;
  /** 播放歌词 */ isPlayLxlrc: boolean;
}
