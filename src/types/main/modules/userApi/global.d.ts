type GlobalEnvParamsPlayType = "songList";
type GlobalEnvParamsPlaySource = LxMusic.Renderer.MusicSourcesId | "myList";
type GlobalEnvParamsPlayName = string | never;

/** 全局环境参数 */
interface GlobalEnvParams {
  /** 以非透明模式启动 */ dt: boolean;
  /** 已重命名为-dt */ nt: boolean;
  /** 禁用硬件加速启动 */ dha: boolean;
  /** 禁用硬件媒体密钥处理 */ dhmkh: boolean;
  /** 搜索 */ search: string;
  /** 播放信息 */ play: `type=${GlobalEnvParamsPlayType}&source=${GlobalEnvParamsPlaySource}&name${GlobalEnvParamsPlayName}&index=${number}`;
}

declare namespace NodeJS {
  interface Global {

    /** 全局模块 */
    modules: {
      /** 主窗口 */ mainWindow: Electron.BrowserWindow;
      /** 用户接口窗口 */ userApiWindow: Electron.BrowserWindow;
      /** 歌词窗口 */ lyricWindow: Electron.BrowserWindow;
      /** 托盘窗口 */ tray: Electron.Tray;
    };

    /** 程序设置 */
    appSetting: LxMusic.Common.Setting;

    /** 环境参数 */
    envParams: {
      /** 已重命名为-dt */ nt: GlobalEnvParams["nt"];
      /** 以非透明模式启动 */ dt: GlobalEnvParams["dt"];
      /** 搜素 */ search: GlobalEnvParams["search"];
      /** 播放信息 */ play: GlobalEnvParams["play"];
      /** 工作区大小 */ workAreaSize: Electron.Size;
      /** 命令行参数 */ cmdParams: GlobalEnvParams;
    };
  }
}
