/** 按键配置 */
export interface KeyInfoConfig {
  /** 启用 */ enable: boolean;
  /** 按键表 */ keys: { [key in string]: LxMusic.Common.HotKeyInfo };
}

/** 默认快捷键 */
export interface DefaultHotKey {
  /** 本地快捷键 */ local: KeyInfoConfig;
  /** 全局快捷键 */ global: KeyInfoConfig;
}
