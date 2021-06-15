import { Point } from "electron";
import { KVMap } from "../store";

/** 取键值 */
declare type ValueOf<T> = T[keyof T];

/** 列表菜单信息 */
export interface MenuInfoConfig<T extends string> {
  /** 显示菜单 */ isShowItemMenu: boolean;
  /** 菜单位置 */ menuLocation: Point;
  /** 右键菜单项 */ rightClickItemIndex: number;
  /** 菜单控制 */ itemMenuControl: KVMap<T, boolean>;
}

/** 行为键值表 */
export interface ActionKeyMap<T extends string> {
  /** 行为 */ action: T;
}

/** 下载菜单行为 */
export type DownloadMenuAction = "play" | "file" | "start" | "pause" | "search" | "remove" | "sourceDetail" | "playLater"

/** 下载标签信息 */
export type DownloadTabInfo = LxMusic.Renderer.TabListProp<"all" | "runing" | "paused" | "error" | "finished">;

/** 下载菜单信息 */
export type DownloadMenuInfo = LxMusic.Renderer.MenuInfo<DownloadMenuAction>;

/** 下载处理信息 */
export interface DownloadHandleInfo {
  /** 动作 */ action: DownloadMenuAction;
  /** 序号 */ index: number;
}

/** 下载列表菜单信息 */
export type DownloadListMenuInfo = MenuInfoConfig<DownloadMenuAction>
