import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '@board-management/shared-store';

@Component({
  selector: 'lib-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task?:Task;
  
  
}
