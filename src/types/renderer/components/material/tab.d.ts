/** 标签列表参数 */
export interface TabListProp<T extends string = string> {
  /** 编号 */ id: T;
  /** 名称 */ name: import("vue-i18n").TranslateResult;
}
