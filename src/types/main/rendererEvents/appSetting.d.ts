/** 主窗口设置信息 */
export interface MainSettingInfo {
  /** 设置 */ setting: NodeJS.Global["appSetting"];
  /** 版本 */ version: NodeJS.Global["appSettingVersion"];
}
