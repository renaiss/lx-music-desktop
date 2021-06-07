/** 请求结果 */
export interface HttpPromoseResult<T = any> {
  /** 已取消 */ isCancelled: boolean;
  /** 许诺 */ promise: Promise<T>;
  /** 取消调用 */ cancelFn: (reason?: any) => void;
  /** 请求数据 */ requestObj: T;
  /** 取消请求 */ cancelHttp: () => void;
}
