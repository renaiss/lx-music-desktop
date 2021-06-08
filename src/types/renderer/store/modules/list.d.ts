/** 播放列表信息 */
export interface PlayListInfo {
  /** 编号 */ id: string;
  /** 名称 */ name: string;
  /** 列表 */ list: LxMusic.UserApiEvent.SongInfo[];
  /** 位置 */ location: number;
  /** 来源 */ source: LxMusic.Renderer.MusicSourcesId;
  /** 来源列表ID */ sourceListId: string;
}

/** 播放列表数据 */
export interface PlayListState {
  /** 为初始列表 */ isInitedList: boolean;
  /** 默认列表 */ defaultList: PlayListInfo;
  /** 喜爱列表 */ loveList: PlayListInfo;
  /** 缓存列表 */ tempList: PlayListInfo;
  /** 用户列表 */ userList: PlayListInfo[];
}

/** 播放列表字典 */
export type PlayListMap = { [id in string]: PlayListInfo; };

/** 播放列表活跃内容 */
export type PlayListActionContext = LxMusic.Renderer.ActionContext<"list", PlayListState>

/** 播放列表初始化信息 */
export interface PlayListStateInitInfo {
  /** 默认列表 */ defaultList: PlayListInfo;
  /** 喜爱列表 */ loveList: PlayListInfo;
  /** 用户列表 */ userList: PlayListInfo[];
}

/** 播放列表添加信息 */
export interface PlayListStateAddInfo {
  /** 列表编号 */ id: string;
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
}

/** 播放列表添加信息 */
export interface PlayListStateMoveInfo {
  /** 移动编号 */ fromId: string;
  /** 目标编号 */ toId: string;
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
}

/** 播放列表批量添加信息 */
export interface PlayListStateAddMultipleInfo {
  /** 列表编号 */ id: string;
  /** 音乐列表 */ list: LxMusic.UserApiEvent.SongInfo[];
}

/** 播放列表批量移动信息 */
export interface PlayListStateMoveMultipleInfo {
  /** 移动编号 */ fromId: string;
  /** 目标编号 */ toId: string;
  /** 音乐列表 */ list: LxMusic.UserApiEvent.SongInfo[];
}

/** 播放列表批量添加信息 */
export interface PlayListStateRemoveInfo {
  /** 列表编号 */ id: string;
  /** 音乐序号 */ index: number;
}

/** 播放列表批量添加信息 */
export interface PlayListStateRemoveMultipleInfo {
  /** 列表编号 */ id: string;
  /** 音乐列表 */ list: LxMusic.UserApiEvent.SongInfo[];
}

/** 播放列表更新音乐信息 */
export interface PlayListStateUpdateMusicInfo {
  /** 列表编号 */ id: string;
  /** 音乐序号 */ index: number;
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 音乐数据 */ data: LxMusic.UserApiEvent.SongInfo;
}

/** 播放列表设置用户列表名称 */
export interface PlayListStateSetUserListNameInfo {
  /** 列表序号 */ index: number;
  /** 列表名称 */ name: string;
}

/** 播放列表滚动信息 */
export interface PlayListStateScrollInfo {
  /** 列表编号 */ id: string;
  /** 列表位置 */ location: number;
}

/** 播放列表排序信息 */
export interface PlayListSortInfo {
  /** 列表编号 */ id: string;
  /** 排序编号 */ sortNum: number;
  /** 音乐列表 */ musicInfos: LxMusic.UserApiEvent.SongInfo[];
}

/** 播放列表设置其它来源信息 */
export interface PlayListSetOtherSourceInfo {
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 其它资源 */ otherSource: LxMusic.UserApiEvent.SongInfo[] | null;
}
