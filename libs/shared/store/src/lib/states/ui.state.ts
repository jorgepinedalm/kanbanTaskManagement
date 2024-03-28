import { Injectable } from "@angular/core";
import { UiService } from "../services/ui.service";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetDarkModeStatus, ToggleDarkMode } from "../actions/ui.actions";
import { tap } from "rxjs";

export class UIStateModel {
    isDarkMode: boolean;
    constructor(){
        this.isDarkMode = false;
    }
}
@State<UIStateModel>({
    name: 'uistate',
    defaults: {
        isDarkMode: false
    }
})
@Injectable()
export class UIState {
    constructor(private _uiService: UiService) { }

    @Selector()
    static selectDarkModeStatus(state: UIStateModel) {
        return state.isDarkMode;
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

}