import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnStatus, Task } from '@board-management/shared-store';
import { TaskComponent } from '../task/task.component';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-column',
  standalone: true,
  imports: [CommonModule, TaskComponent, DragDropModule],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input() indexColumn:number;
  @Input() columnStatus?:ColumnStatus;

  constructor(){
    this.indexColumn = 0;
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log({event});
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
