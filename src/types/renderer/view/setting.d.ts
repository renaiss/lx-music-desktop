export interface SettingFileInfo {
  type: "setting";
  data: LxMusic.Common.Setting;
}

type DefaultHotKey = LxMusic.Common.DefaultHotKey;

export type SettingHotKeyMap = {
  [module in keyof DefaultHotKey]: {
    [name in string]: {
      key: name;
      info: LxMusic.Common.HotKeyInfo;
    };
  };
}

export type SettingHotKeyConfig = {
  [module in keyof DefaultHotKey]: LxMusic.Common.HotKeyInfo[];
}
