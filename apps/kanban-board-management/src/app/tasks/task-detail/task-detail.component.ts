import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BoardState, ChangeSubtaskStatus, ChangeTaskStatus, ColumnStatus, DeleteTasks, GetStatusFromBoard, Subtask, Task } from '@board-management/shared-store';
import { CheckboxComponent, DropdownComponent, StrikeOutTextDirective, UIEvent, UIEventsService } from '@board-management/ui';
import { FormsModule } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent, DropdownComponent, StrikeOutTextDirective],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  task?:Task;
  idBoard:number;
  @Select(BoardState.selectStateColumnStatus) columnStatus$?: Observable<ColumnStatus[]>;
  columnStatus:ColumnStatus[];
  subscription:Subscription;
  
  constructor(
    public config: DynamicDialogConfig, 
    private store:Store, 
    private uiEventService: UIEventsService,
    private ref: DynamicDialogRef
    ){
    this.task = config.data.task;
    this.columnStatus = [];
    this.idBoard = config.data.idBoard;
    this.subscription = new Subscription();
  }
  
  ngOnInit(): void {
    this.store.dispatch(new GetStatusFromBoard(this.idBoard));
    this.getColumnStatus();
    this.countSubtaskInDone();
    this.listenUIEvents();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getColumnStatus(): void{
    this.columnStatus$?.subscribe(columStatus => {
      this.columnStatus = columStatus;
    })
  }

  countSubtaskInDone(): void {
    if(this.task) this.task.countSubtaskInDone = this.task.subtasks.filter(subtask => subtask.isDone).length;
  }

  saveChange(subtask:Subtask): void {
    this.countSubtaskInDone();
    this.store.dispatch(new ChangeSubtaskStatus(subtask.idSubtask, subtask.isDone));
  }

  changeStatus(task:Task): void {
    this.store.dispatch(new ChangeTaskStatus(task.idTask, task.status));
  }

  listenUIEvents(){
    this.subscription = this.uiEventService.eventClick().subscribe(event => {
      if(event && event.action === UIEvent.clickDeleteTask){
        this.store.dispatch(new DeleteTasks(this.task?.idTask as number));
        this.ref.close();
      }
    })
  }

}
