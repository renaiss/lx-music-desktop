declare namespace NodeJS {
  interface Global {

    /** 全局核心 */
    lx_core: {

      /**
       * 设置程序配置
       * @param setting 配置信息
       * @param name 名称
       */
      setAppConfig(setting: LxMusic.Common.Setting, name: string): void;
    };
  }
}
