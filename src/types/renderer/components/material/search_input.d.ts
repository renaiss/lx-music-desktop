/** 搜索输入发送行为数据 */
export interface SearchInputSendActionData {
  blur: never;
  focus: never;
  submit: never;
  change: never;

  listClick: number;
}

/** 搜索输入发送事件 */
export type SearchInputSendEvent = LxMusic.Renderer.SendEvent<SearchInputSendActionData>;

/** 搜索输入发送事件处理 */
export type SearchInputSendEventHnalde = LxMusic.Renderer.SendEventHandle<SearchInputSendActionData>;
