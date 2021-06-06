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

/** 下载状态状态信息 */
export interface DownloadStatusStateInfo {
  /** 下载列表 */ list: [];
  /** 等待列表 */ waitingList: [];
  /** 下载状态信息 */ downloadStatus: DownloadStatusInfo;
}

/** 下载状态状态信息存储 */
export type DownloadStatusStateInfoStore = import("Vuex").Store<DownloadStatusStateInfo>;

/** 下载信息 */
export interface DownloadInfo<
  T extends DownloadStatusResultInfo = DownloadStatusResultInfo,
  E extends MusicQualityExtType = MusicQualityExtType
  > {
  /** 下载完成 */ isComplate: boolean;
  /** 下载状态 */ status: T;
  /** 下载状态文本 */ statusText: DownloadStatusResultInfo[T];
  /** 下载地址 */ url: string;
  /** 文件名 */ fileName: string;
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
}

/** 音质类型 */ export type MusicQualityType = "128k" | "192k" | "320k" | "ape" | "flac" | "wav";
/** 音质提取类型 */ export type MusicQualityExtType = "ape" | "flac" | "wav" | "mp3";
