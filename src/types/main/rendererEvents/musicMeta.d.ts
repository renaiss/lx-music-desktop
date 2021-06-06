/** 歌词元数据信息 */
export interface MusicMetaInfo {
  /** 文件路径 */ filePath: string;
  /** 元数据 */ meta: import("node-id3").Tags;
}
