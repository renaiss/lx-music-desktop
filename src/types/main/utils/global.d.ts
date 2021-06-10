declare namespace NodeJS {
  interface Global {

    /** 即将退出 */
    isQuitting: boolean;

    /** 程序配置版本 */
    appSettingVersion: string;
  }
}
