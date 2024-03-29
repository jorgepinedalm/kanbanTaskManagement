//Change status
export class ChangeSubtaskStatus {
    static readonly type = '[Subtask] Change status';
    constructor(public idSubtask: number, public status:boolean) { }
}