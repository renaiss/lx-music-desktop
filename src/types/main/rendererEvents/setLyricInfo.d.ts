/** 歌词信息表 */
interface LyricInfoMap {
  play: number;
  line: number;
  pause: undefined;
  lines: number[];

  status: {
    line: number;
    isPlay: boolean;
    played_time: number;
  };

  music_info: {
    name: LxMusic.UserApiEvent.SongInfo["singer"];
    album: LxMusic.UserApiEvent.SongInfo["albumId"];
    singer: LxMusic.UserApiEvent.SongInfo["singer"];
    songmid: LxMusic.UserApiEvent.SongInfo["songmid"];
  };

  lyric: {
    lrc: LxMusic.Renderer.MusicPlatformLyricInfo["lyric"];
    tlrc: LxMusic.Renderer.MusicPlatformLyricInfo["tlyric"];
    lxlrc: LxMusic.Renderer.MusicPlatformLyricInfo["lxlyric"];
  };

  info: {
    line: number;
    isPlay: boolean;
    played_time: number;
    name: LxMusic.UserApiEvent.SongInfo["singer"];
    album: LxMusic.UserApiEvent.SongInfo["albumId"];
    singer: LxMusic.UserApiEvent.SongInfo["singer"];
    songmid: LxMusic.UserApiEvent.SongInfo["songmid"];
    lrc: LxMusic.Renderer.MusicPlatformLyricInfo["lyric"];
    tlrc: LxMusic.Renderer.MusicPlatformLyricInfo["tlyric"];
    lxlrc: LxMusic.Renderer.MusicPlatformLyricInfo["lxlyric"];
  };
}

/** 歌词信息类型 */
type LyricInfoType = keyof LyricInfoMap;

/** 歌词信息 */
export type LyricInfo = { [name in LyricInfoType]: { type: name, data: LyricInfoMap[name] } }[LyricInfoType];

/** 设置歌词信息 */
export interface LyricInfoInfo {
    /** 名称 */ name: LxMusic.Common.IpcNameMap["winLyric"]["set_lyric_info"];
    /** 形式 */ modal: "lyricWindow";
    /** 行为 */ action: "status" | "info"
}

/** 设置歌词信息 */
export type SetLyricInfo = LyricInfo & { /** 信息 */ info: LyricInfoInfo; }

/** 设置歌词信息函数 */
export type SetLyricInfoFunc = <T extends LyricInfoType>(type: T, data: LyricInfoMap[T], info: LyricInfoInfo) => void;
