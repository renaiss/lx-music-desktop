/** 热键设置配置 */
export type HotKeySetConfigInfo = {
  /** 行为 */ action: "config";
  /** 数据 */ data: LxMusic.Common.DefaultHotKey;
  /** 来源 */ source: LxMusic.Common.KeyNames;
} | {
  action: "enable";
  data: boolean;
} | {
  action: "register";
  data: LxMusic.HotKey.RegisterHotkeyInfo;
} | {
  action: "unregister";
  data: string;
}
