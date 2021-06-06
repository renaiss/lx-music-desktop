/** 歌曲路径信息 */
import { SongInfo } from './../modules/userApi/rendererEvent/rendererEvent.type.d';

export interface MusicUrlInfo {
  /** 编号 */ id: `${SongInfo["source"]}_${SongInfo["songmid"]}_${string}`;
  /** 地址 */ url: string;
}
