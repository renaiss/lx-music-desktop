import download from "../../../../renderer/store/modules/download";
import hotSearch from "../../../../renderer/store/modules/hotSearch";
import leaderboard from "../../../../renderer/store/modules/leaderboard";
import list from "../../../../renderer/store/modules/list";
import player from "../../../../renderer/store/modules/player";
import search from "../../../../renderer/store/modules/search";
import songList from "../../../../renderer/store/modules/songList";

import { ActionContext as ActionContext2 } from "vuex";

type ParametersOther<T extends (...args: any) => any> = T extends (a: any, ...args: infer P) => any ? P : never;

/** 存储模块表 */
export interface StoreModuleMap {
  /** 下载 */ download: typeof download;
  /** 热搜 */ hotSearch: typeof hotSearch;
  /** 排行榜 */ leaderboard: typeof leaderboard;
  /** 播放列表 */ list: typeof list;
  /** 播放器 */ player: typeof player;
  /** 搜索 */ search: typeof search;
  /** 歌曲列表 */ songList: typeof songList;
}

type StoreModuleName = keyof StoreModuleMap;

// action
type StoreModuleActionName = { [name in StoreModuleName]: keyof StoreModuleMap[name]["actions"]; }[StoreModuleName];

type ActionsParamRetMap<T> = { [name in keyof T]: { param: ParametersOther<T[name]>; return: ReturnType<T[name]>; } };

type ActionParamRet = { [name in StoreModuleName]: ActionsParamRetMap<StoreModuleMap[name]["actions"]>; };

type StoreModuleDispatch<M2 extends StoreModuleName> = <
  M extends StoreModuleName,
  H extends StoreModuleActionName,
  H2 extends StoreModuleActionName
  >(
  path: `${M}/${H}` | `${H2}`,
  ...args: `${M}/${H}` extends never ? ActionParamRet[M2][H2]["param"] : ActionParamRet[M][H]["param"]
) =>
  `${M}/${H}` extends never ? ActionParamRet[M2][H2]["return"] : ActionParamRet[M][H]["return"];

// mitations
type StoreModuleMutationsName = { [name in StoreModuleName]: keyof StoreModuleMap[name]["mutations"]; }[StoreModuleName];

type MutationsParamRetMap<T> = { [name in keyof T]: { param: ParametersOther<T[name]>; return: ReturnType<T[name]>; } };

type MutationsParamRet = { [name in StoreModuleName]: ActionsParamRetMap<StoreModuleMap[name]["mutations"]>; };

type StoreModuleCommit<M2 extends StoreModuleName> = <
  M extends StoreModuleName,
  H extends StoreModuleMutationsName,
  H2 extends StoreModuleMutationsName
  >(
  path: `${M}/${H}` | `${H2}`,
  ...args: `${M}/${H}` extends never ? MutationsParamRet[M2][H2]["param"] : MutationsParamRet[M][H]["param"]
) =>
  `${M}/${H}` extends never ? MutationsParamRet[M2][H2]["return"] : MutationsParamRet[M][H]["return"];

// action_context
type ActionContextR = { setting: LxMusic.Common.Setting; }

export interface ActionContext<M extends StoreModuleName, S> extends ActionContext2<S, ActionContextR> {
  dispatch: StoreModuleDispatch<M>;
  commit: StoreModuleCommit<M>;
}

