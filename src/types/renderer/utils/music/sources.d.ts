/** 歌曲资源 */
export type MusicSources = [
  { name: "酷我音乐"; id: "kw"; },
  { name: "酷狗音乐"; id: "kg"; },
  { name: "QQ音乐"; id: "tx"; },
  { name: "网易音乐"; id: "wy"; },
  { name: "咪咕音乐"; id: "mg"; },
  { name: "虾米音乐"; id: "xm"; },
]

/** 歌曲资源ID */
export type MusicSourcesId = MusicSources[number]["id"];
