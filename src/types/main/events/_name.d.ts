/** 通用事件 */
export interface common {
  /** 初始化配置 */ initConfig: 'initConfig';
  /** 配置状态 */ configStatus: 'config';
}

/** 主窗口事件 */
export interface mainWindow {
  /** 名称 */ name: 'mainWindow';
  /** 设置歌词信息 */ setLyricInfo: 'setLyricInfo';
  /** 销毁 */ destroy: 'destroy';
  /** 退出 */ quit: 'quit';
  /** 切换最小化 */ toggle_minimize: 'toggle_minimize';
  /** 切换隐藏 */ toggle_hide: 'toggle_hide';
  /** 准备显现 */ ready_to_show: 'ready_to_show';
  /** 显示 */ show: 'show';
  /** 隐藏 */ hide: 'hide';
}

/** 托盘事件 */
export interface tray {
  /** 名称 */ name: 'tray';
  /** 创建 */ create: 'create';
  /** 销毁 */ destroy: 'destroy';
}

/** 歌词窗口事件 */
export interface winLyric {
  /** 名称 */ name: 'winLyric';
  /** 创建 */ create: 'create';
  /** 关闭 */ close: 'close';
}

/** 热键事件 */
export interface hotKey {
  /** 名称 */ name: 'hotKey';
  /** 初始化 */ init: 'init';
  /** 配置 */ config: 'config';
  /** 按下按键 */ keyDown: 'keyDown';
}
