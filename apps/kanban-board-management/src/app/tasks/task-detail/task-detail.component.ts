import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Task } from '@board-management/shared-store';
import { CheckboxComponent } from '@board-management/ui';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  task?:Task;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig){
    this.task = config.data.task;
  }
}
