export type SongListMenuActionType = "play" | "download" | "playLater" | "search" | "addTo" | "sourceDetail";

export type SongListMenuConfig = LxMusic.View.MenuInfoConfig<SongListMenuActionType>;

export type SongListMenuInfo = LxMusic.Renderer.MenuInfo<SongListMenuActionType>;

export interface SongListSendActionData {
  search: number;
  testPlay: number;
  togglePage: number;
  flowBtnClick: "download" | "play" | "add";
  listBtnClick: LxMusic.Renderer.ListButtonHandleInfo;
  menuClick: { action: SongListMenuActionType, index: number; };
}

export type SongListSendData = LxMusic.Renderer.SendActionDataMap<SongListSendActionData>;

export type SongListSendEvent = LxMusic.Renderer.SendEvent<SongListSendActionData>;

export type SongListSendEventHanlde = LxMusic.Renderer.SendEventHandle<SongListSendActionData>;
