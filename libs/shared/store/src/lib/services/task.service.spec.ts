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

  describe("fetchTasks", () => {
    it("should returns tasks", () => {
      
      (service as any).tasks = mockTasks;
      service.fetchTasks().subscribe(tasks => {
        expect(tasks).toEqual(mockTasks);
      })
    })
  })

  describe("getTaskById", () => {
    it("should return a task from the tasks array given its id", () => {
      service.getTaskById(2).subscribe(task => {
        expect(task?.idTask).toEqual(2);
      })
    })

    it("should not return a task from the tasks array if it does not exist", () => {
      service.getTaskById(4).subscribe(task => {
        expect(task).toEqual(undefined);
      })
    })

    describe("addTasks", () => {
      it("should add a new task in tasks array", () => {
        service['tasks'] = [];
        const mockTask:Task = {idTask: 5, title: "task 5", description: "description 1", order: 1, status: "done", subtask: []}
        service.addTasks(mockTask).subscribe(task => {
          expect(task.idTask).toEqual(mockTask.idTask);
        })
      })
      
    })

    describe("deleteTask", () => {
      it("should remove a task form tasks array given a id", () => {
        service['tasks'] = [...mockTasks];
        service.deleteTask(2).subscribe(tasks => {
          expect(tasks.find(task => task.idTask === 2)).toBeUndefined();
          expect(tasks).toHaveLength(2);
        })
      })
    })

    describe("updateTask", () => {
      it("should update the task data in a existing task", () => {
        const originalTask:Task = {idTask: 5, title: "task 5", description: "description 1", order: 1, status: "done", subtask: []}
        service['tasks'] = [...mockTasks, originalTask];
        const changedTask:Task = {idTask: 5, title: "task cinco", description: "description 1 complemento", order: 1, status: "done", subtask: []}
        service.updateTask(changedTask, 5).subscribe(task => {
          expect(task?.title).toEqual("task cinco");
        })
      })
      it("should not update the task data if it does not exist", () => {
        const originalTask:Task = {idTask: 5, title: "task 5", description: "description 1", order: 1, status: "done", subtask: []}
        service['tasks'] = [...mockTasks, originalTask];
        const changedTask:Task = {idTask: 5, title: "task cinco", description: "description 1 complemento", order: 1, status: "done", subtask: []}
        service.updateTask(changedTask, 6).subscribe(task => {
          expect(task).toBeUndefined();
        })
      })
    })

    describe("changeOrder", () => {
      it("should update order of task given its id to new order", () => {
        service['tasks'] = [...mockTasks];
        service.changeOrder(1, 3).subscribe(position => {
          expect(service['tasks'][0].order).toEqual(position);
          expect(service['tasks'][2].order).toEqual(1);
        })
      })

      it("should not update order of task if it does not exist", () => {
        service['tasks'] = [...mockTasks];
        service.changeOrder(5, 3).subscribe(() => {
          expect(service['tasks'][0].order).toEqual(1);
        })
      })
    })
  })
});
