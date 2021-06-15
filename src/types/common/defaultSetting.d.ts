/** 播放方法 */
export type PlayMethodInfo = "listLoop" | "random" | "list" | "singleLoop";

/** 播放信息 */
export interface PlayerInfo {
  /** 切换播放方法 */ togglePlayMethod: PlayMethodInfo;
  /** 高质量 */ highQuality: boolean;
  /** 显示任务进度 */ isShowTaskProgess: boolean;
  /** 音量 */ volume: number;
  /** 静音 */ isMute: boolean;
  /** 媒体设备编号 */ mediaDeviceId: string;
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
  /** 上个列表编号 */ prevSelectListId: string;
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

/** 排行榜 */
export interface Leaderboard {
  /** 来源 */ source: LxMusic.Renderer.MusicSourcesId;
  /** 列表编号 */ tabId: string;
}

/** 标签信息 */
export interface SongListTagInfo {
  /** 名称 */ name: string;
  /** 编号 */ id: string;
}

/** 歌曲列表 */
export interface SongList {
  /** 来源 */ source: LxMusic.Renderer.MusicSourcesId,
  /** 排序编号 */ sortId: string,
  /** 目标信息 */ tagInfo: SongListTagInfo;
}

/** 离开搜索框 */
export interface Odc {
  /** 自动清除搜索输入框 */ isAutoClearSearchInput: boolean;
  /** 自动清除搜索列表 */ isAutoClearSearchList: boolean;
}

/** 搜索来源 */
export type SearchSourcesId = LxMusic.Renderer.MusicSourcesId | "all";

/** 搜素 */
export interface Search {
  /** 搜索来源 */ searchSource: SearchSourcesId;
  /** 临时所搜来源 */ tempSearchSource: LxMusic.Renderer.MusicSourcesId;
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
  /** 主题编号 */ themeId: number,
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
  /** 窗口规格编号 */ windowSizeId: number;
  /** 主题编号 */ themeId: LxMusic.Renderer.StoreThemeId;
  /** 语言编号 */ langId: string | number;
  /** 来源编号 */ sourceId: LxMusic.Renderer.MusicSourcesId;
  /** 网络接口编号 */ apiSource: "test" | "temp"; // TODO type error from ApiInfo["id"]
  /** 源名称类型 */ sourceNameType: "real" | "alias";
  /** 显示动画 */ isShowAnimation: boolean;
  /** 随机动画 */ randomAnimate: boolean;
  /** 忽略版本 */ ignoreVersion: string;
  /** 赞同协定 */ isAgreePact: boolean;
  /** 控制按钮位置 */ controlBtnPosition: "left" | "right";
  /** 设置 */ setting?: Setting;
}
