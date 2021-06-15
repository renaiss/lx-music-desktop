type NamesAssert = LxMusic.Common.ModuleNameMap<string>;

type Names = {
  /** 基础名称 */
  base: {
    /** 按键按下 */ key_down: 'key_down';
    /** 绑定案件 */ bindKey: 'bindKey';
    /** 解除按键 */ unbindKey: 'unbindKey';
    /** 聚焦 */ focus: 'focus';
    /** 最小化 */ min: 'min';
    /** 最大化 */ max: 'max';
    /** 关闭 */ close: 'close';
    /** 设置配置 */ set_config: 'set_config';
    /** 设置热键配置 */ set_hot_key_config: 'set_hot_key_config';
  }
}

/** 热键事件名称表 */
export type HotKeyBaseEventNameMap<T extends NamesAssert = Names> = {
  [key in keyof T]: {
    [type in keyof T[key]]: `${key}_${T[key][type]}`;
  };
}
