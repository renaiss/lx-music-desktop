type hotKey = {
  common: {

    min: {
      name: "min";
      action: "min";
    };

    min_toggle: {
      name: "toggle_min";
      action: "toggle_min";
    };

    hide_toggle: {
      name: "toggle_hide";
      action: "toggle_hide";
    };

    close: {
      name: "toggle_close";
      action: "toggle_close";
    };

    focusSearchInput: {
      name: "focus_search_input";
      action: "focus_search_input";
    };

  };

  player: {

    toggle_play: {
      name: "toggle_play";
      action: "toggle_play";
    };

    next: {
      name: "next";
      action: "next";
    };

    prev: {
      name: "prev";
      action: "prev";
    };

    volume_up: {
      name: "volume_up";
      action: "volume_up";
    };

    volume_down: {
      name: "volume_down";
      action: "volume_down";
    };

    volume_mute: {
      name: "volume_mute";
      action: "volume_mute";
    };

  };

  desktop_lyric: {

    toggle_visible: {
      name: "toggle_visible";
      action: "toggle_visible";
    };

    toggle_lock: {
      name: "toggle_lock";
      action: "toggle_lock";
    };

    toggle_always_top: {
      name: "toggle_always_top";
      action: "toggle_always_top";
    };

  };
}

type keyName = {
  common: undefined;
  player: LxMusic.MainName.LxEventDataNameMap["mainWindow"]["name"];
  desktop_lyric: LxMusic.MainName.LxEventDataNameMap["winLyric"]["name"];
}

export type ParseHotKey = {
  [moudle in keyof hotKey]: {
    [type in keyof hotKey[moudle]]: {
      action: `${moudle}_${hotKey[moudle][type]["action"]}`;
      name: `${moudle}_${hotKey[moudle][type]["name"]}`;
      type: keyName[moudle];
    }
  }
}

export type HotKeyInfo = { [key in keyof ParseHotKey]: ParseHotKey[key][keyof ParseHotKey[key]] }[keyof ParseHotKey];

export type KeyNames = keyName[keyof keyName];

export type  HotKeyEventNameMap = { [key in keyof ParseHotKey]: { [name in keyof ParseHotKey[key]]:ParseHotKey[key][name]["action"]; }; };

export = ParseHotKey;
