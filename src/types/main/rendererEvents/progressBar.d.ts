/** 进度信息 */
export interface ProgressInfo {
  /** 进度[0-1.0] */ status: number;
  /** 模式 */ mode: 'none' | 'normal' | 'indeterminate' | 'error' | 'paused';
}
