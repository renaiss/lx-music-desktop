/** 初始化信息 */
export type InitInfo = {
  /** 来源 */
  sources: {
    [key in LxMusic.Renderer.MusicSourcesId]: {
      /** 类型 */ type: 'music';
      /** 行为 */ actions: LxMusic.UserApi.ActionType[];
      /** 质量 */ qualitys: LxMusic.UserApi.QualityType[];
    }
  }
}

/** 结果数据 */
export interface ResponseInfo {
  /** 请求密钥 */ requestKey: string;
  /** 结果 */ result: undefined;
}

/** 歌曲信息 */
export interface SongInfo {
  /** 歌手 */ singer: string;
  /** 歌名 */ name: string;
  /** 唱片名称 */ albumName: string;
  /** 唱片编号 */ albumId: string;
  /** 来源 */ source: LxMusic.Renderer.MusicSourcesId;
  /** 间隔 */ interval: string | null;
  /** 歌曲编号 */ songmid: string;
  /** 图片 */ img: string;
  /** 歌词 */ lrc: string | null;
  /** 其它资源 */ otherSource: LxMusic.Renderer.MusicSourcesId | null;
  /** 音质组 */ types: [
    { type: flac, size: null; },
    { type: '320k', size: string; },
    { type: '128k', size: string; },
  ];
  /** 音质表 */ _types: {
    flac: { size: null; };
    '320k': { size: string; };
    '128k': { size: string; };
  };
  /** 类型链接 */ typeUrl: {};
}

/** 请求信息 */
export interface RequestData {
  /** 来源 */ source: LxMusic.Renderer.MusicSourcesId;
  /** 行为 */ action: 'musicUrl';
  /** 信息 */
  info: {
    /** 类型 */ type: string;
    /** 歌曲信息 */ musicInfo: SongInfo;
  }
}

/** 请求信息 */
export interface RequestInfo {
  /** 请求密钥 */ requestKey: string;
  /** 数据 */ data: RequestData;
}
