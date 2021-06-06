/** 主窗口设置信息 */
export interface MainSettingInfo {
  /** 设置 */ setting: typeof global.appSetting;
  /** 版本 */ version: typeof global.appSettingVersion;
}
