import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BoardState, ChangeSubtaskStatus, ColumnStatus, GetStatusFromBoard, Subtask, Task } from '@board-management/shared-store';
import { CheckboxComponent, DropdownComponent, StrikeOutTextDirective } from '@board-management/ui';
import { FormsModule } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent, DropdownComponent, StrikeOutTextDirective],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent implements OnInit {
  task?:Task;
  idBoard:number;
  @Select(BoardState.selectStateColumnStatus) columnStatus$?: Observable<ColumnStatus[]>;
  columnStatus:ColumnStatus[];
  
  constructor(public config: DynamicDialogConfig, private store:Store){
    this.task = config.data.task;
    this.columnStatus = [];
    this.idBoard = config.data.idBoard;
  }
  ngOnInit(): void {
    this.store.dispatch(new GetStatusFromBoard(this.idBoard));
    this.getColumnStatus();
    this.countSubtaskInDone();
  }

  getColumnStatus(): void{
    this.columnStatus$?.subscribe(columStatus => {
      this.columnStatus = columStatus;
    })
  }

  countSubtaskInDone(): void {
    if(this.task) this.task.countSubtaskInDone = this.task.subtask.filter(subtask => subtask.isDone).length;
  }

  saveChange(subtask:Subtask): void {
    this.countSubtaskInDone();
    this.store.dispatch(new ChangeSubtaskStatus(subtask.idSubtask, subtask.isDone));
  }

}
