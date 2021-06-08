export interface Names {
  /** 初始化 */ init: never;
  /** 网络请求 */ request: never;
  /** 网络响应 */ response: never;
  /** 打开开发工具 */ openDevTools: never;
}

export type ParseNames = { [key in keyof Names]: `userApi_${key}`; }
