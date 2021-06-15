export * from "./download";
export * from "./music";
export * from "./request";

export type DataUnit = "B" | "KB" | "MB" | "GB" | "TB";

export type DataSize = `${number} ${DataUnit}` | `${number}.${number} ${DataUnit}`;
