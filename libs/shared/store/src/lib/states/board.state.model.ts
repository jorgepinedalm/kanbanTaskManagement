import { Board } from "../models/board.model";

export class BoardStateModel {
    boards: Board[]
    selectedBoard?: Board;
    constructor(){
        this.boards = [];
    }
}