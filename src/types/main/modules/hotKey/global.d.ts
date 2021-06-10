declare namespace NodeJS {
  interface Global {

    /** 全局热键 */
    appHotKey: {
      /** 启用 */ enable: boolean;
      /** 配置 */ config: LxMusic.Common.DefaultHotKey;
      /** 状态表 */ state: LxMusic.HotKey.HotKeyMap;
    };
  }
}
