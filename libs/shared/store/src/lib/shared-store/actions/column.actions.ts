import { ColumnStatus } from "../models/column-status.model";

// Get columns from a single board
export class GetColumnsByIdBoard {
    static readonly type = '[Columns] Get columns by ID';
    constructor(public idBoard: number) { }
}

//Create
export class AddColumnInBoard {
    static readonly type = '[Columns] Add columns';
    constructor(payload: ColumnStatus, public idBoard: number) { }
}

//Delete
export class DeleteColumn {
    static readonly type = '[Columns] Delete';
    constructor(public idColumn: number) { }
}