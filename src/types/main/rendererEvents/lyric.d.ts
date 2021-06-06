/** 保存歌词信息 */
export interface SaveLyricInfo {
  /** 编号 */ id: `${LxMusic.UserApiEvent.SongInfo["source"]}_${LxMusic.UserApiEvent.SongInfo["songmid"]}`;
  /** 歌词 */ lyrics: { lyric: unknown; tlyric: unknown; lxlyric: unknown; };
}
