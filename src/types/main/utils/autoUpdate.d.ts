import { UpdateFileInfo, ReleaseNoteInfo, ProgressInfo } from "builder-util-runtime";

/** 更新信息 */
export interface UpdateInfo {
  /** 版本 */ version: string;
  /** 更新文件列表 */ files: UpdateFileInfo[];
  /** 路径 */ path: string;
  /** 加密 */ sha512: string;
  /** 发布名称 */ releaseName: string;
  /** 发行说明 */ releaseNotes: ReleaseNoteInfo[];
  /** 发行数据 */ releaseDate: string;
  /** 分段百分比[0-100] */ stagingPercentage: number;
}

/** 下载进度信息 */
export interface DownloadProgressInfo {
  /** 进度信息 */ progress: ProgressInfo;
  /** 字节/秒 */ bytesPerSecond: number;
  /** 百分比 */ percent: number;
  /** 总数 */ total: number;
  /** 已更新 */ transferred: number;
}

/** 发送事件信息 */
export interface SendEventInfo<T> {
  /** 类型 */ type: T;
  /** 信息 */ info: LxMusic.Common.MainDataMap[T];
}
