type ContextImportFunc<T = any> = (name: string) => ({ default: T } | T);

interface ContextKeys { keys: () => string[]; }

type ContextFuncContext<T = any> = ContextImportFunc<T> & ContextKeys

type ContextFunc<T = any> = (path: string, useSubdirectories: boolean, fileReg: RegExp) => ContextFuncContext<T>;

/** 批量引入 */
interface NodeRequireContext {
  /** 批量引入 */
  context: ContextFunc;
}

interface NodeRequire extends NodeRequireContext { }
