/** 播放音乐信息 */
export interface PlayMusicInfo {
  /** 列表编号 */ listId: string;
  /** 播放序号 */ playIndex: number;
  /** 播放列表编号 */ playListId: string;
  /** 列表播放编号 */ listPlayIndex: number;
  /** 为播放列表 */ isPlayList: boolean;
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 为历史播放 */ isTempPlay: boolean;
}

/** 播放器数据 */
export interface PlayerState {
  /** 列表信息 */
  listInfo: {
  /** 播放列表 */   list: LxMusic.UserApiEvent.SongInfo[];
  /** 列表编号 */   id: string;
  };
  /** 播放序号 */ playIndex: number;
  /** 更改播放 */ changePlay: boolean;
  /** 显示播放器明细 */ isShowPlayerDetail: boolean;
  /** 播放的列表 */ playedList: LxMusic.UserApiEvent.SongInfo[];

  /** 播放音乐信息 */ playMusicInfo: PlayMusicInfo;
  /** 播放历史列表 */ tempPlayList: LxMusic.UserApiEvent.SongInfo[];
}

/** 播放器模块 */
export type PlayerModule = import("vuex").Module<PlayerState, { setting: LxMusic.Common.Setting; }>;

/** 播放器活跃内容 */
export type PlayerActionContext = import("vuex").ActionContext<PlayerState, { setting: LxMusic.Common.Setting; }>

/** 播放器取网址信息 */
export interface PlayerGetUrlInfo {
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 来源类型 */ type: LxMusic.Renderer.MusicSourcesId;
  /** 要刷新 */ isRefresh: string;
  /** 若切换来源 */ onToggleSource: () => void;
}

/** 播放器设置网址信息 */
export interface PlayerSetUrlInfo {
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 来源类型 */ type: LxMusic.Renderer.MusicSourcesId;
  /** 网址 */ url: string;
}

/** 播放器音乐信息 */
export interface PlayerMusicInfo {
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 歌词 */ lyric: string;
  /** 歌词 */ tlyric: string;
  /** 歌词 */ lxlyric: string;
}

/** 播放器设置列表信息 */
export interface PlayerSetListInfo {
  /** 列表信息 */
  list: {
    /** 音乐列表 */ list: LxMusic.UserApiEvent.SongInfo[];
    /** 列表编号 */ id: string;
  };
  /** 序号 */ index: number;
}
