/** 程序参数 */
export interface ArgvParams {
  /** 变量 */ ver: string;
  /** 是草案 */ isDraft: string;
  /** 是预发布 */ isPrerelease: string;
  /** 目标提交 */ target_commitish: string;
}
