/** 事件名称表 */
type EventNameMap = LxMusic.Renderer.HotKeyBaseEventNameMap;

/** 全局活动按键信息 */
export interface EventHubKeyInfo {
  /** 事件信息 */ event: KeyboardEvent;
  /** 键表 */ keys: LxMusic.Common.KeyInfoConfig["keys"];
  /** 键值 */ key: BaseKey;
  /** 类型 */ type: KeyType;
}

export type EventHubKeyHanlde = (backcall: (key: EventHubKeyInfo["key"], type: EventHubKeyInfo["type"], event: EventHubKeyInfo["event"], keys: EventHubKeyInfo["keys"]) => void) => void;

type ControlKey = "ctrl" | "shift" | "mod" | "alt";

type BaseKey = "escape" | "backspace" | "f" | "a";

type KeyType = "down" | "up";

type KeyName = `key_${ControlKey}_${KeyType}` | `key_${BaseKey}_${KeyType}` | `key_${ControlKey}+${BaseKey}_${KeyType}`;

type HotKeyEventNames = { [name in keyof LxMusic.Common.HotKeyEventNameMap]: LxMusic.Common.HotKeyEventNameMap[name][keyof LxMusic.Common.HotKeyEventNameMap[name]]; }[keyof LxMusic.Common.HotKeyEventNameMap];

/** 事件数据表 */
type EventDataMap =
  { /** 基础_按键信息 */[name in KeyName]: [info: { event: KeyboardEvent }]; } &
  { /** 通用_热键信息 */[name in HotKeyEventNames]: never; } &
  { /** 基础_设置配置 */[name in EventNameMap["base"]["set_config"]]: [config: LxMusic.Common.Setting]; } &
  { /** 基础_设置热键配置 */[name in EventNameMap["base"]["set_hot_key_config"]]: [info: LxMusic.Common.DefaultHotKey]; } &
  { /** 基础_最小化 */[name in EventNameMap["base"]["min"]]: never; } &
  { /** 基础_最大化 */[name in EventNameMap["base"]["max"]]: never; } &
  { /** 基础_关闭 */[name in EventNameMap["base"]["close"]]: never; } &
  { /** 基础_绑定按键 */[name in EventNameMap["base"]["bindKey"]]: never; } &
  { /** 基础_解绑按键 */[name in EventNameMap["base"]["unbindKey"]]: never; } &
  { /** 基础_按下按键 */[name in EventNameMap["base"]["key_down"]]: [info: EventHubKeyInfo]; } &
  {};

export type EventHubBackCall<T> = (...args: EventDataMap[T]) => void;

/** 事件绑定 */
type EventHubOn = <T extends string>(name: T, backcall: (...args: EventDataMap[T]) => void) => void;

/** 事件解绑 */
type EventHubOff = <T extends string>(name: T, backcall: (...args: EventDataMap[T]) => void) => void;

/** 事件触发 */
type EventHubEmit = <T extends string>(name: T, ...args: EventDataMap[T]) => void;

/** 全局活动中心 */
export interface WindowEventHub {
  /** 事件绑定 */ $on: EventHubOn;
  /** 事件解绑 */ $off: EventHubOff;
  /** 事件触发 */ $emit: EventHubEmit;
}
