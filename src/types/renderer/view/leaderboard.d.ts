export type LeaderboardActionType = "play" | "collect";

export type LeaderboardControlType = "rename" | "sync" | "moveup" | "movedown" | "remove";

export type LeaderboardMenuConfig = LxMusic.View.MenuInfoConfig<LeaderboardControlType>;

export type LeaderboardMenuInfo = LxMusic.Renderer.MenuInfo<LeaderboardActionType>;
