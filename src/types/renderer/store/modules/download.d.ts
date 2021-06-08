/** 下载状态信息 */
export interface DownloadStatusInfo {
  /** 运行 */ RUN: "run";
  /** 等待 */ WAITING: "waiting";
  /** 暂停 */ PAUSE: "pause";
  /** 错误 */ ERROR: "error";
  /** 完成 */ COMPLETED: "completed";
}

/** 下载信息内容 */
export type DownloadStatusResultInfo = DownloadStatusInfo[keyof DownloadStatusInfo];

/** 下载状态文本 */
export type DownloadStatusTextInfo =
  { [name in DownloadStatusInfo["RUN"]]: "正在下载"; } &
  { [name in DownloadStatusInfo["WAITING"]]: "等待下载"; } &
  { [name in DownloadStatusInfo["PAUSE"]]: "暂停下载"; } &
  { [name in DownloadStatusInfo["ERROR"]]: "任务出错"; } &
  { [name in DownloadStatusInfo["COMPLETED"]]: "下载完成"; };

/** 下载状态数据 */
export interface DownloadStatusState {
  /** 下载列表 */ list: DownloadInfo[];
  /** 等待列表 */ waitingList: DownloadInfo[];
  /** 下载状态信息 */ downloadStatus: DownloadStatusInfo;
}

/** 下载状态激活内容 */
export type DownloadStatusActionContext = LxMusic.Renderer.ActionContext<"download", DownloadStatusState>;

/** 下载信息 */
export interface DownloadInfo<
  T extends DownloadStatusResultInfo = DownloadStatusResultInfo,
  E extends MusicQualityExtType = MusicQualityExtType
  > {
  /** 下载完成 */ isComplate: boolean;
  /** 下载状态 */ status: T;
  /** 下载状态文本 */ statusText: DownloadStatusTextInfo[T];
  /** 下载地址 */ url: string;
  /** 文件名 */ fileName: string;
  /** 文件路径 */ filePath: string;
  /** 下载进度 */
  progress: {
    /** 已下载 */ downloaded: number;
    /** 下载总量 */ total: number;
    /** 下载进度 */ progress: number;
  };
  /** 音质类型 */ type: MusicQualityType;
  /** 音质提取类型 */ ext: E;
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 关键 */ key: `${LxMusic.UserApiEvent.SongInfo["songmid"]}${E}`;
  /** 顺序 */ order: number;
}

/** 音质类型 */ export type MusicQualityType = "128k" | "192k" | "320k" | "ape" | "flac" | "wav";
/** 音质提取类型 */ export type MusicQualityExtType = "ape" | "flac" | "wav" | "mp3";

/** 下载音乐信息 */
export interface DownloadMusicInfo {
  /** 音乐信息 */ musicInfo: LxMusic.UserApiEvent.SongInfo;
  /** 音质类型 */ type: MusicQualityType;
}

/** 下载多音乐信息 */
export interface DownloadMusicListInfo {
  /** 歌曲列表 */ list: LxMusic.UserApiEvent.SongInfo[];
  /** 音质类型 */ type: MusicQualityType;
}

/** 下载参数信息 */
export interface DownloadOptionInfo {
  /** 网址 */ url: string;
  /** 路径 */ path: string;
  /** 文件名 */ fileName: string;
  /** 方式 */ method: LxMusic.Renderer.RequestMethod;
  /** 头信息 */ headers: LxMusic.Renderer.RequestHeaders;
  /** 强制恢复 */ forceResume: boolean;
  /**
   * 恢复时间
   * @deprecated
  */
  resumeTime: number;
  /** 若完成 */ onCompleted: () => void;
  /** 若异常 */ onError: (err: Error) => void;
  /** 若失败 */ onFail: (response: import("request").Response) => void;
  /** 若开始 */ onStart: () => void;
  /** 若停止 */ onStop: () => void;
  /** 若进展[0-1.0] */ onProgress: (status: number) => void;
}

/** 下载表 */
export type DownloadMap = { [key in string]: LxMusic.Renderer.Downloader; }

/** 尝试表 */
export type DownloadTryMap = { [key in string]: number; }

/** 下载状态信息 */
export interface DownloadSetStatusInfo<T extends DownloadStatusResultInfo = DownloadStatusResultInfo> {
  /** 下载信息 */ downloadInfo: DownloadInfo;
  /** 索引 */ index: number;
  /** 文本 */ text: DownloadStatusTextInfo[T];
  /** 下载状态 */ status: T;
  /** 错误信息 */ errorMsg: string | null;
  /** 顺序 */ order: number;
  /** 网址 */ url: string;
  /** 文件路径 */ filePath: string;
}
