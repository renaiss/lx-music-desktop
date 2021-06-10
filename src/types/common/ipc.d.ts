/** 主要交互数据 */
export interface IpcMainInfo<DATA = any> {
  /** 状态 */ status: boolean;
  /** 消息 */ message: string;
  /** 数据 */ data: DATA;
}

type PARSE_NAME = LxMusic.UserApiEvent.ParseNames;

type MAIN_WINDOW = LxMusic.Common.IpcNameMap["mainWindow"];

type LYRIC_WINDOW = LxMusic.Common.IpcNameMap["winLyric"];

type HOT_KEY = LxMusic.Common.IpcNameMap["hotKey"];

/** 参反对 */
export type ParamRet<PARAM, RET> = { PARAM: PARAM; RET: RET; };

/** 回调函数 */
export type MainCallback<PARAM, RET> = (event: Electron.IpcMainEvent, info: PARAM) => RET;

/** 基础参数表 */
export type BaseDataMap =
  { /** 初始化                 */[name in PARSE_NAME["init"]]: IpcMainInfo<LxMusic.UserApiEvent.InitInfo>; } &
  { /** 处理请求结果           */[name in PARSE_NAME["response"]]: IpcMainInfo<LxMusic.UserApiEvent.ResponseInfo>; } &
  { /** 用户网络接口_请求      */[name in PARSE_NAME["request"]]: LxMusic.UserApiEvent.RequestInfo; } &
  { /** 打开开发工具           */[name in PARSE_NAME["openDevTools"]]: never; } &
  { /** 主窗口_最小化          */[name in MAIN_WINDOW["min"]]: never; } &
  { /** 主窗口_最大化          */[name in MAIN_WINDOW["max"]]: never; } &
  { /** 主窗口_切换最小化      */[name in MAIN_WINDOW["min_toggle"]]: never; } &
  { /** 主窗口_切换隐藏        */[name in MAIN_WINDOW["hide_toggle"]]: never; } &
  { /** 主窗口_关闭            */[name in MAIN_WINDOW["close"]]: boolean; } &
  { /** 主窗口_退出            */[name in MAIN_WINDOW["quit"]]: never; } &
  { /** 主窗口_聚焦            */[name in MAIN_WINDOW["focus"]]: never; } &
  { /** 主窗口_重置窗体         */[name in MAIN_WINDOW["restart_window"]]: LxMusic.Common.KeyNames; } &
  { /** 主窗口_设置程序名称     */[name in MAIN_WINDOW["set_app_name"]]: string | null; } &
  { /** 主窗口_设置窗口大小     */[name in MAIN_WINDOW["set_window_size"]]: Partial<Electron.Rectangle>; } &
  { /** 主窗口_设置配置         */[name in MAIN_WINDOW["set_config"]]: LxMusic.Common.Setting; } &
  { /** 主窗口_设置程序配置     */[name in MAIN_WINDOW["set_app_setting"]]: LxMusic.Common.Setting; } &
  { /** 主窗口_保存数据         */[name in MAIN_WINDOW["save_data"]]: LxMusic.Renderer.SaveDataInfo; } &
  { /** 主窗口_取歌词信息       */[name in MAIN_WINDOW["get_lyric_info"]]: LxMusic.Renderer.LyricInfoInfo; } &
  { /** 主窗口_设置歌词信息     */[name in MAIN_WINDOW["set_lyric_info"]]: LxMusic.Renderer.SetLyricInfo; } &
  { /** 主窗口_保存歌词         */[name in MAIN_WINDOW["save_lyric"]]: LxMusic.Renderer.SaveLyricInfo; } &
  { /** 主窗口_清除歌词         */[name in MAIN_WINDOW["clear_lyric"]]: never; } &
  { /** 主窗口_按键按下         */[name in MAIN_WINDOW["key_down"]]: LxMusic.Renderer.KeyDownInfo; } &
  { /** 主窗口_设置忽略鼠标事件 */[name in MAIN_WINDOW["set_ignore_mouse_events"]]: boolean; } &
  { /** 主窗口_处理网络请求     */[name in MAIN_WINDOW["handle_request"]]: LxMusic.Renderer.HandleRequestInfo; } &
  { /** 主窗口_取消网络请求     */[name in MAIN_WINDOW["cancel_request"]]: number; } &
  { /** 主窗口_设置歌曲元数据   */[name in MAIN_WINDOW["set_music_meta"]]: LxMusic.Renderer.MusicMetaInfo; } &
  { /** 主窗口_取歌曲地址       */[name in MAIN_WINDOW["get_music_url"]]: LxMusic.Renderer.MusicUrlInfo["id"]; } &
  { /** 主窗口_保存歌曲地址     */[name in MAIN_WINDOW["save_music_url"]]: LxMusic.Renderer.MusicUrlInfo; } &
  { /** 主窗口_清除歌曲地址     */[name in MAIN_WINDOW["clear_music_url"]]: never; } &
  { /** 主窗口_保存播放列表     */[name in MAIN_WINDOW["save_playlist"]]: LxMusic.Renderer.SavePlayListInfo; } &
  { /** 主窗口_进度条           */[name in MAIN_WINDOW["progress"]]: LxMusic.Renderer.ProgressInfo; } &
  { /** 主窗口_用户网络接口状态 */[name in MAIN_WINDOW["user_api_status"]]: LxMusic.UserApi.StatusInfo; } &
  { /** 主窗口_更新失败         */[name in MAIN_WINDOW["update_error"]]: Error["message"]; } &
  { /** 主窗口_可更新           */[name in MAIN_WINDOW["update_available"]]: LxMusic.Utils.UpdateInfo; } &
  { /** 主窗口_不可更新         */[name in MAIN_WINDOW["update_not_available"]]: LxMusic.Utils.UpdateInfo; } &
  { /** 主窗口_更新进度         */[name in MAIN_WINDOW["update_progress"]]: LxMusic.Utils.DownloadProgressInfo; } &
  { /** 主窗口_更新下载完成     */[name in MAIN_WINDOW["update_downloaded"]]: LxMusic.Utils.UpdateInfo; } &
  { /** 主窗口_退出更新         */[name in MAIN_WINDOW["quit_update"]]: never; } &
  { /** 歌词窗口_设置窗口边界   */[name in LYRIC_WINDOW["set_win_bounds"]]: LxMusic.WinLyric.WinBoundsInfo; } &
  { /** 歌词窗口_设置歌词信息   */[name in LYRIC_WINDOW["set_lyric_info"]]: LxMusic.Renderer.SetLyricInfo; } &
  { /** 歌词窗口_获取歌词信息   */[name in LYRIC_WINDOW["get_lyric_info"]]: LxMusic.WinLyric.LyricActionInfo; } &
  { /** 歌词窗口_按键按下       */[name in LYRIC_WINDOW["key_down"]]: LxMusic.Renderer.KeyDownInfo; };

/** 主要参数表 */
export type MainDataMap =
  BaseDataMap &
  { /** 主窗口_设置热键配置   */[name in MAIN_WINDOW["set_hot_key_config"]]: LxMusic.Renderer.HotKeyConfigInfo; } &
  { /** 歌词窗口_设置歌词配置 */[name in LYRIC_WINDOW["set_lyric_config"]]: LxMusic.Common.DesktopLyric; };

/** 面板监视参数表 */
export type RendererOnDataMap =
  BaseDataMap &
  { /** 主窗口_设置热键配置   */[name in MAIN_WINDOW["set_hot_key_config"]]: LxMusic.Common.DefaultHotKey; } &
  { /** 歌词窗口_设置歌词配置 */[name in LYRIC_WINDOW["set_lyric_config"]]: LxMusic.WinLyric.LyricConfigInfo; };

/** 主要处理参数表 */
export type MainHandleDataMap =
  { /** 热键_取配置                 */[name in HOT_KEY["set_config"]]: ParamRet<LxMusic.HotKey.HotKeySetConfigInfo, void>; } &
  { /** 热键_取状态                 */[name in HOT_KEY["status"]]: ParamRet<never, LxMusic.HotKey.HotKeyMap>; } &
  { /** 热键_置启用                 */[name in HOT_KEY["enable"]]: ParamRet<boolean, void>; } &
  { /** 主窗口_选择文件夹           */[name in MAIN_WINDOW["select_dir"]]: ParamRet<Electron.OpenDialogOptions, Electron.OpenDialogReturnValue>; } &
  { /** 主窗口_显示弹窗             */[name in MAIN_WINDOW["show_dialog"]]: ParamRet<Electron.MessageBoxSyncOptions, void>; } &
  { /** 主窗口_显示保存弹窗         */[name in MAIN_WINDOW["show_save_dialog"]]: ParamRet<Electron.SaveDialogOptions, Electron.SaveDialogReturnValue>; } &
  { /** 主窗口_获取数据             */[name in MAIN_WINDOW["get_data"]]: ParamRet<string, any>; } &
  { /** 主窗口_取热键信息           */[name in MAIN_WINDOW["get_hot_key"]]: ParamRet<never, LxMusic.Common.DefaultHotKey>; } &
  { /** 主窗口_取播放列表           */[name in MAIN_WINDOW["get_playlist"]]: ParamRet<boolean, LxMusic.Renderer.PlayListInfo>; } &
  { /** 主窗口_设置程序配置         */[name in MAIN_WINDOW["set_app_setting"]]: ParamRet<LxMusic.Common.Setting, void>; } &
  { /** 主窗口_取配置               */[name in MAIN_WINDOW["get_setting"]]: ParamRet<never, LxMusic.Renderer.MainSettingInfo>; } &
  { /** 主窗口_清除缓存             */[name in MAIN_WINDOW["clear_cache"]]: ParamRet<never, void>; } &
  { /** 主窗口_取缓存大小           */[name in MAIN_WINDOW["get_cache_size"]]: ParamRet<never, number>; } &
  { /** 主窗口_取数据路径           */[name in MAIN_WINDOW["get_data_path"]]: ParamRet<never, string>; } &
  { /** 主窗口_取环境参数           */[name in MAIN_WINDOW["get_env_params"]]: ParamRet<never, NodeJS.Global["envParams"]["cmdParams"]>; } &
  { /** 主窗口_取环境参数           */[name in MAIN_WINDOW["handle_kw_decode_lyric"]]: ParamRet<LxMusic.Renderer.KwDecodeLyricInfo, string>; } &
  { /** 主窗口_取歌曲地址           */[name in MAIN_WINDOW["get_music_url"]]: ParamRet<LxMusic.Renderer.MusicUrlInfo["id"], string>; } &
  { /** 主窗口_取歌词               */[name in MAIN_WINDOW["get_lyric"]]: ParamRet<LxMusic.Renderer.SaveLyricInfo["id"], import("electron-store")>; } &
  { /** 主窗口_请求用户网络接口     */[name in MAIN_WINDOW["request_user_api"]]: ParamRet<LxMusic.UserApiEvent.RequestInfo, LxMusic.UserApiEvent.ResponseInfo["result"]>; } &
  { /** 主窗口_取消请求用户网络接口 */[name in MAIN_WINDOW["request_user_api_cancel"]]: ParamRet<string, void>; } &
  { /** 主窗口_引入用户网络接口     */[name in MAIN_WINDOW["import_user_api"]]: ParamRet<string, LxMusic.UserApi.ImportApiResult>; } &
  { /** 主窗口_移除用户网络接口     */[name in MAIN_WINDOW["remove_user_api"]]: ParamRet<LxMusic.UserApi.ApiInfo["id"][], LxMusic.UserApi.ApiInfo[]>; } &
  { /** 主窗口_设置用户网络接口     */[name in MAIN_WINDOW["set_user_api"]]: ParamRet<LxMusic.UserApi.ApiInfo["id"], void>; } &
  { /** 主窗口_取用户网络接口列表   */[name in MAIN_WINDOW["get_user_api_list"]]: ParamRet<never, LxMusic.UserApi.ApiInfo[]>; } &
  { /** 主窗口_取用户网络接口状态   */[name in MAIN_WINDOW["get_user_api_status"]]: ParamRet<never, LxMusic.UserApiEvent.InitInfo>; } &
  { /** 歌词窗口_获取歌词配置       */[name in LYRIC_WINDOW["get_lyric_config"]]: ParamRet<never, LxMusic.WinLyric.LyricConfigInfo>; };

/** 主要监听回调函数 */
export type MainOnCallback<T extends keyof MainDataMap> = MainCallback<MainDataMap[T], void>;

/** 主要监听 */
export type MainOn = <T extends keyof MainDataMap>(name: T, callback: MainOnCallback<T>) => void;

/** 主要发送 */
export type MainSend = <T extends keyof MainDataMap>(window: Electron.BrowserWindow, name: T, params: MainDataMap[T]) => void;

/** 主要处理 */
export type MainHandle = <T extends keyof MainHandleDataMap>(name: T, callback: MainCallback<MainHandleDataMap[T]["PARAM"], Promise<MainHandleDataMap[T]["RET"]>>) => void;

/** 面板监听 */
export type RendererOn = <T extends keyof RendererOnDataMap>(name: T, callback: MainCallback<RendererOnDataMap[T], void>) => void;

/** 面板发送 */
export type RendererSend = <T extends keyof MainDataMap>(name: T, params: MainDataMap[T]) => void;

/** 面板调用 */
export type RendererInvoke = <T extends keyof MainHandleDataMap>(name: T, params: MainHandleDataMap[T]["PARAM"]) => Promise<MainHandleDataMap[T]["RET"]>;
