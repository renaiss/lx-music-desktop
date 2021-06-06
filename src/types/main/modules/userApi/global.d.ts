namespace NodeJS {
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
      /**  */ nt: boolean; // TODO 未知
      /**  */ dt: boolean; // TODO 未知
      /** 搜素 */ search: string;
      /** 播放项 */ play: string;
      /** 工作区大小 */ workAreaSize: Electron.Size;
      /** 命令行参数 */ cmdParams: { [key: string]: string; };
    };
  }
}
