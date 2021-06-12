/** 音质接口编号 */
export type MusicQualitysApiId = "test" | "temp";

/** 网络接口质量表 */
export type ApiSupportQualitys = { [name in MusicQualitysApiId]: LxMusic.UserApi.QualityType[]; };

/** 音质接口信息 */
export interface MusicQualitysApiInfo {
  /** 编号 */ id: MusicQualitysApiId;
  /** 名称 */ name: string;
  /** 禁用 */ disabled: boolean;
  /** 音质支持 */ supportQualitys: LxMusic.UserApi.SupportQualitys;
}
