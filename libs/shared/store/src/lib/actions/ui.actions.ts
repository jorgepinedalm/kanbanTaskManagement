//get cofig
export class GetUIConfig {
    static readonly type = '[UI] Get config';
}

// Toggle dark mode
export class ToggleDarkMode  {
    static readonly type = '[UI] on/off dark mode';
    constructor(public darkMode: boolean) { }
}

//Toggle sidebar visibility
export class ToggleSideBar {
    static readonly type = '[UI] Toggle sidebar visibility';
    constructor(public sidebarVisible: boolean) { }
}