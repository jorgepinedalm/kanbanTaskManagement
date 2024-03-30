import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { BoardStateModel } from "./board.state.model";
import { BoardService } from "../services/board.service";
import { GetBoardById, GetBoards, GetStatusFromBoard } from "../actions/board.actions";
import { tap } from "rxjs";
import { ColumnStatus } from "../models/column-status.model";
import { AddTasks, ChangeTaskStatus, DeleteTasks, UpdateTasksInColumn } from "../actions/task.actions";
import { TaskService } from "../services/task.service";
import { ChangeSubtaskStatus } from "../actions/subtask.actions";
import { AddColumnInBoard } from "../actions/column.actions";

@State<BoardStateModel>({
    name: 'appstate',
    defaults: {
        boards: [],
        columnStatus: [],
        selectedBoard: undefined
    }
})
@Injectable()
export class BoardState {
    constructor(private _boardService: BoardService, private _taskService: TaskService) { }

    @Selector()
    static selectStateBoard(state:BoardStateModel){
        return state.boards;
    }

    @Selector()
    static selectSelectedBoard(state: BoardStateModel) {
        return state.selectedBoard;
    }

    @Selector()
    static selectStateColumnStatus(state:BoardStateModel){
        return state.columnStatus;
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

    @Action(GetStatusFromBoard)
    getStatusFromBoard(ctx: StateContext<BoardStateModel>, { idBoard }: GetStatusFromBoard) {
        return this._boardService.getStatusFromBoard(idBoard).pipe(tap(() => {
            const state = ctx.getState();
            let status:ColumnStatus[] = [];
            const board = state.boards.find(board => board.idBoard == idBoard);
            if(board){
              status = board.columnStatus;
            }
            if (board) {
                ctx.patchState({
                    ...state,
                    columnStatus: status
                });
            }
        }));
    }

    @Action(UpdateTasksInColumn)
    updateTasksInColumn(ctx: StateContext<BoardStateModel>, { payload, idColumn }: UpdateTasksInColumn) {
        return this._taskService.updateTaskInColumn(idColumn, payload).pipe(tap((returnData) => {
            const state = ctx.getState();
            const board = state.boards.find(board => board.idBoard == returnData?.idBoard);
            if (board) {
                ctx.patchState({
                    ...state,
                    selectedBoard: returnData
                });
            }
        }));
    }

    @Action(ChangeSubtaskStatus)
    updateSubtaskStatusInTask(ctx: StateContext<BoardStateModel>, { idSubtask, status}: ChangeSubtaskStatus) {
        return this._taskService.updateSubtaskStatusInTask(idSubtask, status).pipe(tap((returnData) => {
            const state = ctx.getState();
            const board = state.boards.find(board => board.idBoard == returnData?.idBoard);
            if (board) {
                ctx.patchState({
                    ...state,
                    selectedBoard: returnData
                });
            }
        }));
    }

    @Action(ChangeTaskStatus)
    updateTaskStatus(ctx: StateContext<BoardStateModel>, { id, status}: ChangeTaskStatus) {
        return this._taskService.updateStatus(id, status).pipe(tap((returnData) => {
            const state = ctx.getState();
            const board = state.boards.find(board => board.idBoard == returnData?.idBoard);
            if (board) {
                ctx.patchState({
                    ...state,
                    selectedBoard: returnData
                });
            }
        }));
    }

    @Action(AddTasks)
    addTask(ctx: StateContext<BoardStateModel>, { payload, idBoard}: AddTasks) {
        return this._taskService.addTask(idBoard, payload).pipe(tap((returnData) => {
            const state = ctx.getState();
            const board = state.boards.find(board => board.idBoard == returnData?.idBoard);
            if (board) {
                ctx.patchState({
                    ...state,
                    selectedBoard: returnData
                });
            }
        }));
    }

    @Action(AddColumnInBoard)
    addColumn(ctx: StateContext<BoardStateModel>, { payload, idBoard}: AddColumnInBoard) {
        return this._boardService.addColumn(idBoard, payload).pipe(tap((returnData) => {
            const state = ctx.getState();
            const board = state.boards.find(board => board.idBoard == returnData?.idBoard);
            if (board) {
                ctx.patchState({
                    ...state,
                    selectedBoard: returnData
                });
            }
        }));
    }

    @Action(DeleteTasks)
    deleteTask(ctx: StateContext<BoardStateModel>, { id}: DeleteTasks) {
        return this._taskService.deleteTask(id).pipe(tap((returnData) => {
            const state = ctx.getState();
            const board = state.boards.find(board => board.idBoard == returnData?.idBoard);
            if (board) {
                ctx.patchState({
                    ...state,
                    selectedBoard: returnData
                });
            }
        }));
    }

}

