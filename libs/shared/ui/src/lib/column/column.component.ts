import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnStatus } from '@board-management/shared-store';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'lib-column',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input() columnStatus?:ColumnStatus;
}
