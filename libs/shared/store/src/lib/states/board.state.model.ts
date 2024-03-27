import { Board } from "../models/board.model";
import { Task } from "../models/task.model";

export class BoardStateModel {
    boards: Board[]
    selectedTask?: Task;
    constructor(){
        this.boards = [];
    }
}