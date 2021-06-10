/** 歌曲路径信息 */
type SongInfo = LxMusic.UserApiEvent.SongInfo;

export interface MusicUrlInfo {
  /** 编号 */ id: `${SongInfo["source"]}_${SongInfo["songmid"]}_${string}`;
  /** 地址 */ url: string;
}
