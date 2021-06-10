/** 按键状态信息 */
export interface KeyState {
  /** 状态 */ status: boolean;
  /** 信息 */ info: unknown;// TODO 未知
}

/** 热键表 */
export type HotKeyMap = { [key in string]: LxMusic.HotKey.KeyState; }

/** 注册热键信息 */
export interface RegisterHotkeyInfo {
  /** 键值 */ key: string;
  /** 信息 */ info: unknown;// TODO 未知
}
