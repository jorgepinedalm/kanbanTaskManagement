import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { BoardStateModel } from "./board.state.model";
import { BoardService } from "../services/board.service";
import { GetBoards } from "../actions/board.actions";
import { tap } from "rxjs";

@State<BoardStateModel>({
    name: 'appstate',
    defaults: {
        boards: [],
        selectedTask: undefined
    }
})
@Injectable()
export class AppState {
    constructor(private _boardService: BoardService) { }

    @Selector()
    static selectStateBoard(state:BoardStateModel){
        return state.boards;
    }

    @Action(GetBoards)
    getDataFromState(ctx: StateContext<BoardStateModel>) {
        return this._boardService.fetchBoards().pipe(tap(returnData => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                boards: returnData
            })
        }))
    }
}

