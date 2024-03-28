//get cofig
export class GetUIConfig {
    static readonly type = '[UI] Get config';
}

// Toggle dark mode
export class ToggleDarkMode  {
    static readonly type = '[UI] on/off dark mode';
    constructor(public darkModeStatus: boolean) { }
}

export class GetDarkModeStatus  {
    static readonly type = '[UI] get dark mode status';
}

//Toggle sidebar visibility
export class ToggleSideBar {
    static readonly type = '[UI] Toggle sidebar visibility';
    constructor(public sidebarVisible: boolean) { }
}