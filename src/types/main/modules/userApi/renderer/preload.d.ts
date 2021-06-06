/** 质量类型 */ export type QualityType = "128k" | "320k" | "flac";

/** 支持的质量 */
export type SupportQualitys = { [source in LxMusic.Common.SourcesId]: QualityType[] };

/** 操作类型 */ export type ActionType = "musicUrl";

/** 支持的操作 */
export type SupportActions = { [source in LxMusic.Common.SourcesId]: ActionType[] };

/** 初始化信息 */
export interface InitInfo {
  /** 状态 */ status: boolean;
  /** 消息 */ message: string;
  /** 打开开发工具 */ openDevTools: boolean;
  /** 来源质量 */ sources: SupportQualitys;
}
