/** 播放方法 */
export type PlayMethodInfo = "listLoop" | "random" | "list" | "singleLoop";

/** 播放信息 */
export interface PlayerInfo {
  /** 切换播放方法 */ togglePlayMethod: PlayMethodInfo;
  /** 高质量 */ highQuality: boolean;
  /** 显示任务进度 */ isShowTaskProgess: boolean;
  /** 音量 */ volume: number;
  /** 静音 */ isMute: boolean;
  /** 媒体设备ID */ mediaDeviceId: string;
  /** 媒体设备是否已删除停止播放 */ isMediaDeviceRemovedStopPlay: boolean;
  /** 是否显示歌词翻译 */ isShowLyricTranslation: boolean;
  /** 播放歌词文件 */ isPlayLxlrc: boolean;
  /** 是否保存播放时间 */ isSavePlayTime: boolean;
}

/** 桌面歌词样式 */
export interface DesktopLyricStyle {
  /** 桌面歌词样式 */ DesktopLyricStyle: Object;
  /** 文字大小 */ fontSize: number;
  /** 不透明度 */ opacity: number;
  /** 缩放激活歌词 */ isZoomActiveLrc: boolean;
}

/** 桌面歌词 */
export interface DesktopLyric {
  /** 启用 */ enable: boolean;
  /** 锁定位置 */ isLock: boolean;
  /** 置顶 */ isAlwaysOnTop: boolean;
  /** 宽度 */ width: number;
  /** 高度 */ height: number;
  /** 横坐标 */ x: number;
  /** 纵坐标 */ y: number;
  /** 主题 */ theme: number;
  /** 锁屏显示 */ isLockScreen: boolean;
  /** 桌面歌词样式 */ style: DesktopLyricStyle;
}

/** 播放列表 */
export interface List {
  /** 显示相册名称 */ isShowAlbumName: boolean;
  /** 显示来源 */ isShowSource: boolean;
  /** 上个列表ID */ prevSelectListId: string;
  /** 保存滚动位置 */ isSaveScrollLocation: boolean;
}

/** 下载 */
export interface Download {
  /** 启用 */ enable: boolean;
  /** 保存路径 */ savePath: string;
  /** 文件名称 */ fileName: string;
  /** 最大同时下载数 */ maxDownloadNum: string;
  /** 下载歌词 */ isDownloadLrc: boolean;
  /** 嵌入图片 */ isEmbedPic: boolean;
  /** 嵌入歌词 */ isEmbedLyric: boolean;
  /** 使用其它来源 */ isUseOtherSource: boolean;
}

/** 歌曲资源 */
export type Sources = [
  { name: "酷我音乐"; id: "kw"; },
  { name: "酷狗音乐"; id: "kg"; },
  { name: "QQ音乐"; id: "tx"; },
  { name: "网易音乐"; id: "wy"; },
  { name: "咪咕音乐"; id: "mg"; },
  { name: "虾米音乐"; id: "xm"; },
]

/** 歌曲资源ID */
export type SourcesId = Sources[number]["id"];

/** 排行榜 */
export interface Leaderboard {
  /** 来源 */ source: SourcesId;
  /** 列表ID */ tabId: string;
}

/** 标签信息 */
export interface SongListTagInfo {
  /** 名称 */ name: string;
  /** 编号 */ id: string;
}

/** 歌曲列表 */
export interface SongList {
  /** 来源 */ source: SourcesId,
  /** 排序ID */ sortId: string,
  /** 目标信息 */ tagInfo: SongListTagInfo;
}

/** 离开搜索框 */
export interface Odc {
  /** 自动清除搜索输入框 */ isAutoClearSearchInput: boolean;
  /** 自动清除搜索列表 */ isAutoClearSearchList: boolean;
}

/** 搜素 */
export interface Search {
  /** 搜索来源 */ searchSource: SourcesId | "all";
  /** 临时所搜来源 */ tempSearchSource: SourcesId;
  /** 显示热搜 */ isShowHotSearch: boolean;
  /** 显示搜索历史 */ isShowHistorySearch: boolean;
  /** 聚焦搜索框 */ isFocusSearchBox: boolean;
}

/** 网络 */
export interface Network {
  /** 代理 */
  proxy: {
    /** 启用 */ enable: boolean;
    /** 域名 */ host: string;
    /** 端口 */ port: string;
    /** 用户名 */ username: string;
    /** 密码 */ password: string;
  }
}

/** 托盘 */
export interface Tray {
  /** 托盘显示 */ isShow: boolean,
  /** 开启最小化托盘 */ isToTray: boolean,
  /** 主题ID */ themeId: number,
}

/** 默认设置 */
export interface Setting {
  /** 版本 */ version: string;
  /** 播放信息 */ player: PlayerInfo;
  /** 桌面歌词 */ desktopLyric: DesktopLyric;
  /** 播放列表 */ list: List;
  /** 下载 */ download: Download;
  /** 排行榜 */ leaderboard: Leaderboard;
  /** 歌曲列表 */ songList: SongList;
  /** 离开搜索框 */ odc: Odc;
  /** 搜素 */ search: Search;
  /** 网络 */ network: Network;
  /** 托盘 */ tray: Tray;
  /** 窗口规格ID */ windowSizeId: number;
  /** 主题ID */ themeId: number;
  /** 语言ID */ langId: null;
  /** 来源ID */ sourceId: SourcesId;
  /** 网络接口ID */ apiSource: "test" | "temp";
  /** 源名称类型 */ sourceNameType: "real" | "alias";
  /** 显示动画 */ isShowAnimation: boolean;
  /** 随机动画 */ randomAnimate: boolean;
  /** 忽略版本 */ ignoreVersion: boolean;
  /** 赞同协定 */ isAgreePact: boolean;
  /** 控制按钮位置 */ controlBtnPosition: "left" | "right";
}