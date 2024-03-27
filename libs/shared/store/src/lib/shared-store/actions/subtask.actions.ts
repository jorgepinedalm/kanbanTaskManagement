//Change status
export class ChangeStatus {
    static readonly type = '[Subtask] Change status';
    constructor(public idSubtask: number, status:boolean) { }
}