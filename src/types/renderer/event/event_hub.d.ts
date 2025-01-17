import { ParseHotKey } from "src/types/common";

/** 事件名称表 */
type EventNameMap = LxMusic.Renderer.HotKeyBaseEventNameMap;

/** 全局活动按键信息 */
export interface EventHubKeyInfo {
  /** 键值 */ key: BaseKey;
  /** 类型 */ type: KeyType;
  /** 事件信息 */ event: KeyboardEvent & Target;
  /** 键表 */ keys: string[];
}

export type EventHubKeyHanlde = (backcall: (key: EventHubKeyInfo["key"], type: EventHubKeyInfo["type"], event: EventHubKeyInfo["event"], keys: EventHubKeyInfo["keys"]) => void) => void;

type ControlKey = "ctrl" | "shift" | "mod" | "alt";

type BaseKey = "escape" | "backspace" | "delete" | "f" | "a";

type KeyType = "down" | "up";

type KeyName = `key_${ControlKey}_${KeyType}` | `key_${BaseKey}_${KeyType}` | `key_${ControlKey}+${BaseKey}_${KeyType}`;

type HotKeyEventNames = { [name in keyof LxMusic.Common.HotKeyEventNameMap]: LxMusic.Common.HotKeyEventNameMap[name][keyof LxMusic.Common.HotKeyEventNameMap[name]]; }[keyof LxMusic.Common.HotKeyEventNameMap];

/** 按键事件信息 */
export interface HubKeyEven<T extends HTMLElement = HTMLElement> {
  /** 事件信息 */ event: KeyboardEvent & Target<T>;
}

/** 事件数据表 */
type EventDataMap =
  { /** 基础_按键信息 */[name in KeyName]: [info: HubKeyEven]; } &
  { /** 通用_热键信息 */[name in HotKeyEventNames]: []; } &
  { /** 基础_最小化 */[name in EventNameMap["base"]["min"]]: []; } &
  { /** 基础_最大化 */[name in EventNameMap["base"]["max"]]: []; } &
  { /** 基础_关闭 */[name in EventNameMap["base"]["close"]]: []; } &
  { /** 基础_绑定按键 */[name in EventNameMap["base"]["bindKey"]]: []; } &
  { /** 基础_解绑按键 */[name in EventNameMap["base"]["unbindKey"]]: []; } &
  { /** 基础_按下按键 */[name in EventNameMap["base"]["key_down"]]: [info: EventHubKeyInfo]; } &
  { /** 基础_设置配置 */[name in EventNameMap["base"]["set_config"]]: [config: LxMusic.Common.Setting]; } &
  { /** 基础_设置热键配置 */[name in EventNameMap["base"]["set_hot_key_config"]]: [info: LxMusic.Common.DefaultHotKey]; }&
  { /** 基础_设置配置 */[name in LxMusic.Common.ParseHotKey["player"]["volume_up"]["action"]]: [step: number]; } &
  { /** 基础_设置配置 */[name in LxMusic.Common.ParseHotKey["player"]["volume_down"]["action"]]: [step: number]; } &
  {};

type MapArray = { [key: string]: any[] };

export type EventHubBackCall<T extends keyof EventDataMap, E extends MapArray = EventDataMap> = (...args: E[T]) => void;

/** 事件绑定 */
type EventHubOn = <T extends string, E extends MapArray = EventDataMap>(name: T, backcall: (...args: E[T]) => void) => void;

/** 事件解绑 */
type EventHubOff = <T extends string, E extends MapArray = EventDataMap>(name: T, backcall: (...args: E[T]) => void) => void;

/** 事件触发 */
type EventHubEmit = <T extends string, E extends MapArray = EventDataMap>(name: T, ...args: E[T]) => void;

/** 全局活动中心 */
export interface WindowEventHub {
  /** 事件绑定 */ $on: EventHubOn;
  /** 事件解绑 */ $off: EventHubOff;
  /** 事件触发 */ $emit: EventHubEmit;
}
