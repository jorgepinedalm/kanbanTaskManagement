import { Board } from "../models/board.model";

//Read
export class GetBoards {
    static readonly type = '[Boards] Fetch';
}

// Get a single board
export class GetBoardById {
    static readonly type = '[Boards] Get by ID';
    constructor(public id: number) { }
}

//Create
export class AddBoards {
    static readonly type = '[Boards] Add';
    constructor(public payload: Board) { }
}

//Update
export class UpdateBoards {
    static readonly type = '[Boards] Update';
    constructor(public payload: Board, public id: number) { }
}

//Delete
export class DeleteBoards {
    static readonly type = '[Boards] Delete';
    constructor(public id: number) { }
}