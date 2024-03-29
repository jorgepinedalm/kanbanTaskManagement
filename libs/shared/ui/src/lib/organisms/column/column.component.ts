import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnStatus, Task, UpdateTasksInColumn } from '@board-management/shared-store';
import { TaskComponent } from '../../molecules/task/task.component';
import {DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Store } from '@ngxs/store';

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

  constructor(private store:Store){
    this.indexColumn = 0;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.store.dispatch(new UpdateTasksInColumn(this.columnStatus?.tasks as Task[], this.columnStatus?.idColumnStatus as number));
    } else {
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const idColumn = event.container.element.nativeElement.dataset["idcolumn"];
      const columnName = event.container.element.nativeElement.dataset["columnname"] || "";
      event.container.data[event.currentIndex].status = columnName;
      if(idColumn) this.store.dispatch(new UpdateTasksInColumn(event.container.data as Task[], +idColumn));
      
    }
  }
}
