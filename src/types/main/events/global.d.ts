namespace NodeJS {
  interface Global {

    /** 全局事件 */
    lx_event: {
      /** 普通事件 */ common: import("../../../main/events/Common");
      /** 主窗口事件 */ mainWindow: import("../../../main/events/MainWindow");
      /** 托盘事件 */ tray: import("../../../main/events/Tray");
      /** 桌面歌词事件 */ winLyric: import("../../../main/events/WinLyric");
      /** 热键事件 */ hotKey: import("../../../main/events/HotKey");
      /** 用户接口事件 */ userApi: import("../../../main/modules/userApi").Event;
    };
  }
}
