/** 歌单菜单类型 */
export type SheetMenuType = "rename" | "sync" | "moveup" | "movedown" | "remove";

/** 歌曲菜单类型 */
export type SheetMusicMenuType = "play" | "download" | "playLater" | "addTo" | "moveTo" | "sort" | "copyName" | "sourceDetail" | "search" | "remove";

/** 歌单菜单信息 */
export type SheetMenuInfoConfig = LxMusic.View.MenuInfoConfig<SheetMenuType>;

/** 歌曲菜单信息 */
export type SheetMusicMenuInfoConfig = LxMusic.View.MenuInfoConfig<SheetMusicMenuType>;

/** 歌单菜单项信息 */
export type SheetMenuItemInfo = LxMusic.Renderer.MenuInfo<SheetMenuType>;

/** 歌曲菜单项信息 */
export type SheetMusicMenuItemInfo = LxMusic.Renderer.MenuInfo<SheetMusicMenuType>;
