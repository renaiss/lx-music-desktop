// @ts-nocheck
declare namespace LxMusic {
  namespace Common {
    import("./common"); export * from "./common";
  }
  namespace MainName {
    import("./main/events"); export * from "./main/events";
  }
  namespace HotKey {
    import("./main/modules/hotKey"); export * from "./main/modules/hotKey";
  }
  namespace UserApi {
    import("./main/modules/userApi"); export * from "./main/modules/userApi";
    import("./main/modules/userApi/event"); export * from "./main/modules/userApi/event";
    import("./main/modules/userApi/renderer"); export * from "./main/modules/userApi/renderer";
    import("./main/modules/userApi/utils"); export * from "./main/modules/userApi/utils";
    import("./main/modules/userApi/config"); export * from "./main/modules/userApi/config";
  }
  namespace UserApiEvent {
    import("./main/modules/userApi/rendererEvent"); export * from "./main/modules/userApi/rendererEvent";
  }
  namespace WinLyric {
    import("./main/modules/winLyric"); export * from "./main/modules/winLyric";
  }
  namespace Renderer {
    import("./main/rendererEvents"); export * from "./main/rendererEvents";
    import("./renderer/components"); export * from "./renderer/components";
    import("./renderer/event"); export * from "./renderer/event";
    import("./renderer/plugins/Tips"); export * from "./renderer/plugins/Tips";
    import("./renderer/store"); export * from "./renderer/store";
    import("./renderer/utils"); export * from "./renderer/utils";
  }
  namespace Utils {
    import("./main/utils"); export * from "./main/utils";
  }
  namespace Publish {
    import("./other/publish"); export * from "./publish";
  }
}
