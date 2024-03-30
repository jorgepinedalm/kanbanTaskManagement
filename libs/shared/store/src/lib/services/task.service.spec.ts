import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  const mockTasks = [
    {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "done", subtask: []},
    {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "pending", subtask: []},
    {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "pending", subtask: []}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
