import { Injectable } from "@angular/core";
import { UiService } from "../services/ui.service";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetDarkModeStatus, GetSidebarVisibility, ToggleDarkMode, ToggleSidebar } from "../actions/ui.actions";
import { tap } from "rxjs";

export class UIStateModel {
    isDarkMode: boolean;
    hideSidebar: boolean;
    constructor(){
        this.isDarkMode = false;
        this.hideSidebar = false;
    }
}
@State<UIStateModel>({
    name: 'uistate',
    defaults: {
        isDarkMode: false,
        hideSidebar: false
    }
})
@Injectable()
export class UIState {
    constructor(private _uiService: UiService) { }

    @Selector()
    static selectDarkModeStatus(state: UIStateModel) {
        return state.isDarkMode;
    }

    @Selector()
    static selectSidebarVisibility(state: UIStateModel) {
        return state.hideSidebar;
    }

    @Action(ToggleDarkMode)
    toggleDarkMode(ctx: StateContext<UIStateModel>, { darkModeStatus }: ToggleDarkMode) {
        return this._uiService.toggleDarkMode(darkModeStatus).pipe(tap(status => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                isDarkMode: status
            })
        }))
    }

    @Action(GetDarkModeStatus)
    getDarkModeStatus(ctx: StateContext<UIStateModel>) {
        return this._uiService.getDarkModeStatus().pipe(tap(status => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                isDarkMode: status
            })
        }))
    }

    @Action(ToggleSidebar)
    toggleSidebar(ctx: StateContext<UIStateModel>, { hideSidebar }: ToggleSidebar) {
        return this._uiService.toggleHideSidebar(hideSidebar).pipe(tap(status => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                hideSidebar: status
            })
        }))
    }

    @Action(GetSidebarVisibility)
    getSidebarVisibility(ctx: StateContext<UIStateModel>) {
        return this._uiService.getSideBarVisibility().pipe(tap(status => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                hideSidebar: status
            })
        }))
    }

}