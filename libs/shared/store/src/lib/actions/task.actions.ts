import { ColumnStatus } from "../models/column-status.model";
import { Task } from "../models/task.model";

//Read
export class GetTasks {
    static readonly type = '[Tasks] Fetch';
}

// Get a single task
export class GetTaskById {
    static readonly type = '[Tasks] Get by ID';
    constructor(public id: number) { }
}

//Create
export class AddTasks {
    static readonly type = '[Tasks] Add';
    constructor(public payload: Task) { }
}

//Update
export class UpdateTasksInColumn {
    static readonly type = '[Tasks] Update in Column';
    constructor(public payload: Task[], public idColumn: number) { }
}

//Delete
export class DeleteTasks {
    static readonly type = '[Tasks] Delete';
    constructor(public id: number) { }
}

//Move
export class MoveTask {
    static readonly type = '[Tasks] Move task';
    constructor(public id: number, newColumn:ColumnStatus) { }
}

//Order
export class ChangeOrder {
    static readonly type = '[Tasks] Change order';
    constructor(public id: number, position:number) { }
}

//Status
export class ChangeStatus {
    static readonly type = '[Tasks] Change status';
    constructor(public id: number, status:string) { }
}