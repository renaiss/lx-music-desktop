type ContextImportFunc = (name: string) => ({ default: string } | string);

interface ContextKeys { keys: () => string[]; }

type ContextFunc = (path: string, useSubdirectories: boolean, fileReg: RegExp) => ContextImportFunc & ContextKeys;

/** 批量引入 */
interface NodeRequireContext {
  /** 批量引入 */
  context: ContextFunc;
}

interface NodeRequire extends NodeRequireContext { }
