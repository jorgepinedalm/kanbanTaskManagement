import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@board-management/shared-store';
import { UIEventsService } from '../../../services/ui-libs-events.service';
import { UIEvent } from '../../../enums/UIEvent.enum';

@Component({
  selector: 'lib-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnChanges {
  @Input() task?:Task;

  constructor(
    private _uiEventsService:UIEventsService
  ){
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['task'] && this.task){
      this.task.countSubtaskInDone = this.task.subtasks.filter(subtask => subtask.isDone).length;
    }
  }

  openTaskDetail(){
    this._uiEventsService.setEvent({action:UIEvent.clickTask, data:{task: this.task}});
  }
  
}
