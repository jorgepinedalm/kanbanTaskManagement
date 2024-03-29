// Toggle dark mode
export class ToggleDarkMode  {
    static readonly type = '[UI] on/off dark mode';
    constructor(public darkModeStatus: boolean) { }
}

export class GetDarkModeStatus  {
    static readonly type = '[UI] get dark mode status';
}

//Toggle sidebar visibility
export class ToggleSidebar {
    static readonly type = '[UI] Toggle sidebar visibility';
    constructor(public hideSidebar: boolean) { }
}

export class GetSidebarVisibility  {
    static readonly type = '[UI] get sidebar visibility status';
}