/** 储存模块主题 */
export type StoreThemes = [
  { id: 0; name: '绿意盎然'; class: 'green'; },
  { id: 1; name: '蓝田生玉'; class: 'blue'; },
  { id: 2; name: '信口雌黄'; class: 'yellow'; },
  { id: 3; name: '橙黄橘绿'; class: 'orange'; },
  { id: 4; name: '热情似火'; class: 'red'; },
  { id: 10; name: '粉装玉琢'; class: 'pink'; },
  { id: 5; name: '重斤球紫'; class: 'purple'; },
  { id: 6; name: '灰常美丽'; class: 'grey'; },
  { id: 11; name: '青出于黑'; class: 'ming'; },
  { id: 12; name: '青出于黑'; class: 'blue2'; },
  { id: 13; name: '黑纸白字'; class: 'black'; },
  { id: 7; name: '月里嫦娥'; class: 'mid_autumn'; },
  { id: 8; name: '木叶之村'; class: 'naruto'; },
  { id: 9; name: '新年快乐'; class: 'happy_new_year'; },
];

/** 储存模块主题编号 */
export type StoreThemeId = StoreThemes[number]["id"];

/** 储存模块新版本 */
export interface StoreHistoryVersionInfo {
  /** 版本 */ version: string;
}

/** 储存模块新版本 */
export interface StoreNewVersionInfo {
  /** 历史版本 */ history: StoreHistoryVersionInfo[];
  /** 版本 */ version: string;
  /** 描述 */ desc: string;
}

/** 储存模块版本 */
export interface StoreVersionInfo {
  /** 版本 */ version: string;
  /** 新版本 */ newVersion: StoreNewVersionInfo;
  /** 显示模块 */ showModal: boolean;
  /** 要显示 */ isShow: boolean;
  /** 有错误 */ isError: boolean;
  /** 有延时 */ isTimeOut: boolean;
  /** 有未知 */ isUnknow: boolean;
  /** 有下载 */ isDownloaded: boolean;
  /** 在下载 */ isDownloading: boolean;
  /** 有落后版本 */ isLatestVer: boolean;
  /** 下载进度条 */ downloadProgress: LxMusic.Utils.DownloadProgressInfo;
}

/** 储存模块根数据 */
export interface StoreRootState {
  /** 主题信息 */ themes: StoreThemes;
  /** 版本信息 */ version: StoreVersionInfo;
  /** 用户信息 */ userInfo: null;
  /** 设置信息 */ setting: LxMusic.Common.Setting;
  /** 设置版本 */ settingVersion: string;
  /** 窗体规格列表 */ windowSizeList: LxMusic.Common.WindowSizeInfo[];
  /** 路由信息 */ route: unknown;
}
