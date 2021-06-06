/** 情求方式 */
export type RequestMethod = `${"g" | "G"}${"et" | "ET"}` | `${"p" | "P"}${"ost" | "OST"}` | `${"p" | "P"}${"ut" | "UT"}` | `${"d" | "D"}${"elete" | "ELETE"}`;

/** 情求协议头 */
export type RequestHeaders = { [key in string]: string };

/** 处理请求信息 */
export interface HandleRequestInfo {
  /** 地址 */ url: string;
  /** 方式 */ method: RequestMethod;
  /** 协议头 */ headers: { [key in string]: string };
  /** 来源 */ origin: string;
}
