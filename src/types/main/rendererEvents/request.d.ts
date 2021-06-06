/** 处理请求信息 */
export interface HandleRequestInfo {
  /** 地址 */ url: string;
  /** 协议 */ method: `${"g" | "G"}${"et" | "ET"}` | `${"p" | "P"}${"ost" | "OST"}` | `${"p" | "P"}${"ut" | "UT"}` | `${"d" | "D"}${"elete" | "ELETE"}`;
  /** 协议头 */ headers: { [key in string]: string };
  /** 来源 */ origin: string;
}
