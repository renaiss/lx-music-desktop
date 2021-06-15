/** 事件数据名称表 */
export interface LxEventDataNameMap {
  /** 通用 */
  common: {
    /** 初始化配置 */ initConfig: "initConfig";
    /** 配置状态 */ configStatus: "config";
  }

  /** 主窗口 */
  mainWindow: {
    /** 名称 */ name: "mainWindow";
    /** 设置歌词信息 */ setLyricInfo: "setLyricInfo";
    /** 销毁 */ destroy: "destroy";
    /** 退出 */ quit: "quit";
    /** 切换最小化 */ toggle_minimize: "toggle_minimize";
    /** 切换隐藏 */ toggle_hide: "toggle_hide";
    /** 准备显现 */ ready_to_show: "ready_to_show";
    /** 显示 */ show: "show";
    /** 隐藏 */ hide: "hide";
  }

  /** 托盘 */
  tray: {
    /** 名称 */ name: "tray";
    /** 创建 */ create: "create";
    /** 销毁 */ destroy: "destroy";
  }

  /** 歌词窗口 */
  winLyric: {
    /** 名称 */ name: "winLyric";
    /** 创建 */ create: "create";
    /** 关闭 */ close: "close";
  }

  /** 热键 */
  hotKey: {
    /** 名称 */ name: "hotKey";
    /** 初始化 */ init: "init";
    /** 配置 */ config: "config";
    /** 按下按键 */ keyDown: "keyDown";
  }

  /** 用户脚本 */
  userApi: {
    /** 状态 */ status: "status";
  }
}

type LxEventDataMapAssert = LxMusic.Common.ModuleNameMap<any[]>;

/** 事件数据名称表 */
export type LxEventDataMap = {
  /** 通用 */
  common:
  { [name in LxEventDataNameMap["common"]["initConfig"]]: []; } &
  { [name in LxEventDataNameMap["common"]["configStatus"]]: [name: LxMusic.Common.KeyNames]; };

  /** 主窗口 */
  mainWindow:
  { [name in LxEventDataNameMap["mainWindow"]["setLyricInfo"]]: [info: LxMusic.Renderer.SetLyricInfo]; } &
  { [name in LxEventDataNameMap["mainWindow"]["destroy"]]: []; } &
  { [name in LxEventDataNameMap["mainWindow"]["quit"]]: []; } &
  { [name in LxEventDataNameMap["mainWindow"]["toggle_minimize"]]: []; } &
  { [name in LxEventDataNameMap["mainWindow"]["toggle_hide"]]: []; } &
  { [name in LxEventDataNameMap["mainWindow"]["ready_to_show"]]: []; } &
  { [name in LxEventDataNameMap["mainWindow"]["show"]]: []; } &
  { [name in LxEventDataNameMap["mainWindow"]["hide"]]: []; }

  /** 托盘 */
  tray:
  { [name in LxEventDataNameMap["tray"]["create"]]: []; } &
  { [name in LxEventDataNameMap["tray"]["destroy"]]: []; };

  /** 歌词窗口 */
  winLyric:
  { [name in LxEventDataNameMap["winLyric"]["create"]]: []; } &
  { [name in LxEventDataNameMap["winLyric"]["close"]]: []; };

  /** 热键 */
  hotKey:
  { [name in LxEventDataNameMap["hotKey"]["init"]]: []; } &
  { [name in LxEventDataNameMap["hotKey"]["config"]]: [config: LxMusic.Renderer.HotKeyConfigInfo["config"], source: LxMusic.Renderer.HotKeyConfigInfo["source"]]; } &
  { [name in LxEventDataNameMap["hotKey"]["keyDown"]]: [info: LxMusic.Renderer.KeyDownInfo]; };

  /** 用户脚本 */
  userApi: { [name in LxEventDataNameMap["userApi"]["status"]]: [info: LxMusic.UserApi.StatusInfo]; };
}

/** 事件模块名称 */
export type LxEventModuleName = keyof LxEventDataMap;

/** 事件监听 */
export type LxEventOn<
  M extends LxEventModuleName,
  E extends LxEventDataMapAssert = LxEventDataMap,
  > = <T extends keyof E[M]>(name: T, callback: (...args: E[M][T]) => void) => void;

/** 事件触发 */
export type LxEventEmit<
  M extends LxEventModuleName,
  E extends LxEventDataMapAssert = LxEventDataMap,
  > = <T extends keyof E[M]>(name: T, ...args: E[M][T]) => void;

/** 事件数据类 */
export class LxEventDataClass<M extends LxEventModuleName> {
  on: LxEventOn<M>;
  emit: LxEventEmit<M>;
}
