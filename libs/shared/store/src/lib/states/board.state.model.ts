import { Board } from "../models/board.model";
import { ColumnStatus } from "../models/column-status.model";

export class BoardStateModel {
    boards: Board[]
    selectedBoard?: Board;
    columnStatus: ColumnStatus[];
    constructor(){
        this.boards = [];
        this.columnStatus = [];
    }
}