/** 时间表 */
export type NameMap = {
  /** 主窗口 */
  mainWindow: {
    /** 聚焦 */ focus: 'focus';
    /** 关闭 */ close: 'close';
    /** 最小化 */ min: 'min';
    /** 最大化 */ max: 'max';
    /** 设置程序名称 */ set_app_name: 'set_app_name';
    /** 清除缓存 */ clear_cache: 'clear_cache';
    /** 获取缓存大小 */ get_cache_size: 'get_cache_size';
    /** 获取环境参数 */ get_env_params: 'get_env_params';

    /** 设置音乐元数据 */ set_music_meta: 'set_music_meta';
    /** 进度条 */ progress: 'progress';
    /** 改变托盘 */ change_tray: 'change_tray';
    /** 退出更新 */ quit_update: 'quit_update';
    /** 可更新 */ update_available: 'update_available';
    /** 更新错误 */ update_error: 'update_error';
    /** 更新进度 */ update_progress: 'update_progress';
    /** 更新下载 */ update_downloaded: 'update_downloaded';
    /** 不可更新 */ update_not_available: 'update_not_available';
    /** 设置忽略鼠标事件 */ set_ignore_mouse_events: 'set_ignore_mouse_events';
    /** 设置程序配置 */ set_app_setting: 'set_app_setting';
    /** 设置窗口大小 */ set_window_size: 'set_window_size';
    /** 显示保存弹窗 */ show_save_dialog: 'show_save_dialog';

    /** 处理请求 */ handle_request: 'handle_request';
    /** 取消请求 */ cancel_request: 'cancel_request';

    /** 处理XM验证打开 */ handle_xm_verify_open: 'handle_xm_verify_open';
    /** 处理XM验证关闭 */ handle_xm_verify_close: 'handle_xm_verify_close';
    /** 选择文件夹 */ select_dir: 'select_dir';

    /** 重置窗体 */ restart_window: 'restart_window';

    /** 处理KW歌词解密 */ handle_kw_decode_lyric: 'handle_kw_decode_lyric';
    /** 获取歌词信息 */ get_lyric_info: 'get_lyric_info';
    /** 设置·歌词信息 */ set_lyric_info: 'set_lyric_info';
    /** 设置配置 */ set_config: 'set_config';
    /** 设置热键配置 */ set_hot_key_config: 'set_hot_key_config';
    /** 按键按下 */ key_down: 'key_down';
    /** 退出 */ quit: 'quit';
    /** 切换最小化 */ min_toggle: 'min_toggle';
    /** 切换隐藏 */ hide_toggle: 'hide_toggle';
    /** 获取数据路径 */ get_data_path: 'get_data_path';
    /** 显示弹窗 */ show_dialog: 'show_dialog';

    /** 获取配置 */ get_setting: 'get_setting';
    /** 获取播放列表 */ get_playlist: 'get_playlist';
    /** 保存播放列表 */ save_playlist: 'save_playlist';
    /** 获取数据 */ get_data: 'get_data';
    /** 保存数据 */ save_data: 'save_data';
    /** 获取热键 */ get_hot_key: 'get_hot_key';

    /** 引入用户网络接口 */ import_user_api: 'import_user_api';
    /** 移除用户网络接口 */ remove_user_api: 'remove_user_api';
    /** 设置用户网络接口 */ set_user_api: 'set_user_api';
    /** 获取用户网络接口列表 */ get_user_api_list: 'get_user_api_list';
    /** 请求用户网络接口 */ request_user_api: 'request_user_api';
    /** 取消请求用户网络接口 */ request_user_api_cancel: 'request_user_api_cancel';
    /** 获取用户网络接口状态 */ get_user_api_status: 'get_user_api_status';
    /** 用户网络接口状态 */ user_api_status: 'user_api_status';

    /** 获取歌词 */ get_lyric: 'get_lyric';
    /** 保存歌词 */ save_lyric: 'save_lyric';
    /** 清除歌词 */ clear_lyric: 'clear_lyric';
    /** 获取音乐路径 */ get_music_url: 'get_music_url';
    /** 保存音乐路径 */ save_music_url: 'save_music_url';
    /** 清楚音乐路径 */ clear_music_url: 'clear_music_url';
  };

  /** 歌词窗口 */
  winLyric: {
    /** 关闭 */ close: 'close';
    /** 设置歌词信息 */ set_lyric_info: 'set_lyric_info';
    /** 获取歌词信息 */ get_lyric_info: 'get_lyric_info';
    /** 设置歌词信息 */ set_lyric_config: 'set_lyric_config';
    /** 获取歌词配置 */ get_lyric_config: 'get_lyric_config';
    /** 设置窗口边界 */ set_win_bounds: 'set_win_bounds';
    /** 按键按下 */ key_down: 'key_down';
  };

  /** 热键 */
  hotKey: {
    /** 启用 */ enable: 'enable';
    /** 状态 */ status: 'status';
    /** 设置配置 */ set_config: 'set_config';
  };
}

export type IpcNameMap = { [module in keyof NameMap]: { [type in keyof NameMap[module]]: `${module}_${NameMap[module][type]}` } }
