// @ts-nocheck
import download from "../../../../renderer/store/modules/download";
import hotSearch from "../../../../renderer/store/modules/hotSearch";
import leaderboard from "../../../../renderer/store/modules/leaderboard";
import list from "../../../../renderer/store/modules/list";
import player from "../../../../renderer/store/modules/player";
import search from "../../../../renderer/store/modules/search";
import songList from "../../../../renderer/store/modules/songList";
import { rootStoreOption } from "../../../../renderer/store/index";

import { ActionContext as VuexActionContext } from "vuex";

type ParametersOther<T extends (...args: any) => any> = T extends (a: any, ...args: infer P) => any ? P : [];

type AnyFuncMap = LxMusic.Common.ModuleMap<(...args: any[]) => any>;

type AnyParamRetMap = LxMusic.Common.ModuleNameMap<{ param: any[], return: any }>;

/** 根存储模块 */
export type RootStore = typeof rootStoreOption;

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

/** 存储模块名称 */
type StoreModuleName = keyof StoreModuleMap;

// action

/** 存储模块行为名称 */
type StoreModuleActionName = { [name in StoreModuleName]: keyof StoreModuleMap[name]["actions"]; }[StoreModuleName];

/** 存储模块行为参反表 */
type ActionsParamRetMap<T extends AnyFuncMap> = { [name in keyof T]: { param: ParametersOther<T[name]>; return: ReturnType<T[name]>; } };

/** 存储模块行为参反数据 */
type ActionParamRet = { [name in StoreModuleName]: ActionsParamRetMap<StoreModuleMap[name]["actions"]>; };

/** 存储模块派遣 */
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

/** 存储模块变化名称 */
type StoreModuleMutationsName = { [name in StoreModuleName]: keyof StoreModuleMap[name]["mutations"]; }[StoreModuleName];

/** 存储模块变化参反表 */
type MutationsParamRetMap<T> = { [name in keyof T]: { param: ParametersOther<T[name]>; return: ReturnType<T[name]>; } };

/** 存储模块变化参反数据 */
type MutationsParamRet = { [name in StoreModuleName]: ActionsParamRetMap<StoreModuleMap[name]["mutations"]>; };

/** 存储模块提交 */
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

type ActionContextRootState = LxMusic.Renderer.StoreRootState;

export interface ActionContext<M extends StoreModuleName, S> extends VuexActionContext<S, ActionContextRootState> {
  dispatch: StoreModuleDispatch<M>;
  commit: StoreModuleCommit<M>;
}

declare module "vuex" {
  const mapGetters:
    (<T extends keyof RootStore["getters"]>(name: T[]) => { [name in T]: (...args: ParametersOther<RootStore["getters"][name]>) => ReturnType<RootStore["getters"][name]>; }) &
    (<M extends StoreModuleName, T extends keyof StoreModuleMap[M]["getters"]>(module: M, name: T[]) => { [name in T]: (...args: ParametersOther<StoreModuleMap[M]["getters"][name]>) => ReturnType<StoreModuleMap[M]["getters"][name]>; });
  const mapMutations:
    (<T extends keyof RootStore["mutations"]>(name: T[]) => { [name in T]: (...args: ParametersOther<RootStore["mutations"][name]>) => ReturnType<RootStore["mutations"][name]>; }) &
    (<M extends StoreModuleName, T extends keyof StoreModuleMap[M]["mutations"]>(module: M, name: T[]) => { [name in T]: (...args: ParametersOther<StoreModuleMap[M]["mutations"][name]>) => ReturnType<StoreModuleMap[M]["mutations"][name]>; });
  const mapActions:
    (<T extends keyof RootStore["actions"]>(name: T[]) => { [name in T]: (...args: ParametersOther<RootStore["actions"][name]>) => ReturnType<RootStore["actions"][name]>; }) &
    (<M extends StoreModuleName, T extends keyof StoreModuleMap[M]["actions"]>(module: M, name: T[]) => { [name in T]: (...args: ParametersOther<StoreModuleMap[M]["actions"][name]>) => ReturnType<StoreModuleMap[M]["mutations"][name]>; });
}
