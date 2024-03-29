import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Task } from '@board-management/shared-store';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  task?:Task;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig){
    this.task = config.data.task;
  }
}
