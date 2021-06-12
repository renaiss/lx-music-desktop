interface GlobalObjInfo {
  /** 网络接口来源 */ apiSource: LxMusic.Renderer.MusicQualitysApiId;
  /** 网络代理 */ proxy: LxMusic.Common.Network["proxy"];
  /** 显示协议 */ isShowPact: boolean;
  /** 质量表 */ qualityList: LxMusic.Renderer.ApiSupportQualitys,
  /** 用户脚本信息 */ userApi: LxMusic.UserApi.GlobalUserApiInfo;
}

interface Window {
  /** 恢复播放信息 */ restorePlayInfo: LxMusic.Component.RestorePlayInfo;

  /** 全局对象 */ globalObj: GlobalObjInfo;
}
