/** 热键配置信息 */
export interface HotKeyConfigInfo {
  /** 配置 */ config: LxMusic.Common.HotKeyInfo; // TODO 可能
  /** 来源 */ source: LxMusic.Common.KeyNames;
}

/** 按键按下信息 */
export interface KeyDownInfo {
  /** 类型 */ type: LxMusic.Common.KeyNames;
  /** 按键 */ key: string;
}
