import json from "./languages.json"

declare module "./languages.json" {
  const config: LxMusic.Renderer.LangConfig[];
  // @ts-ignore
  export = config;
}
