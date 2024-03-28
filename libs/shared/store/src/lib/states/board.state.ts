import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { BoardStateModel } from "./board.state.model";
import { BoardService } from "../services/board.service";
import { GetBoardById, GetBoards } from "../actions/board.actions";
import { tap } from "rxjs";

@State<BoardStateModel>({
    name: 'appstate',
    defaults: {
        boards: [],
        selectedBoard: undefined
    }
})
@Injectable()
export class BoardState {
    constructor(private _boardService: BoardService) { }

    @Selector()
    static selectStateBoard(state:BoardStateModel){
        return state.boards;
    }

    @Selector()
    static selectSelectedBoard(state: BoardStateModel) {
        return state.selectedBoard;
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

    @Action(GetBoardById)
    getTaskById(ctx: StateContext<BoardStateModel>, { id }: GetBoardById) {
        return this._boardService.getBoardById(id).pipe(tap(() => {
            const state = ctx.getState();
            const board = state.boards.find(board => board.idBoard === id);
            if (board) {
                ctx.patchState({
                    ...state,
                    selectedBoard: board
                });
            }
        }));
    }
}

