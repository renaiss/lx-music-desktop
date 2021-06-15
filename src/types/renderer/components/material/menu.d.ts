import { TranslateResult } from "vue-i18n";

/** 菜单信息 */
export interface MenuInfo<T extends string = string> {
  /** 动作 */ action: T;
  /** 名称 */ name: TranslateResult;
  /** 隐藏 */ hide: boolean;
  /** 禁用 */ disabled: boolean;
}
