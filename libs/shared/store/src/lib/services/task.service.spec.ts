import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { MockDataService } from './mock-data.service';
import { Board } from '../models/board.model';

describe('TaskService', () => {
  let service: TaskService;
  let mockDataService:MockDataService;
  const mockBoards:Board[] = [
    {
      idBoard: 1,
      name: "board 1",
      columnStatus: [
        {
          idColumnStatus: 1,
          name: "todo",
          order: 1,
          tasks: [
            {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "done", subtasks: []},
            {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "pending", subtasks: []},
            {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "pending", subtasks: []}
          ]
        }
      ]
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockDataService]
    });
    service = TestBed.inject(TaskService);
    mockDataService = TestBed.inject(MockDataService);
    jest.spyOn(mockDataService, "getBoards").mockReturnValue(mockBoards);
    const localStorageMock = {
      setItem: jest.fn(),
      getItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("updateTaskInColumn", () => {
    it('should update task in column and return updated board', () => {
      jest.spyOn(localStorage, "setItem").mockImplementation(jest.fn());
      service['boards'] = [
        {
          idBoard: 1,
          name: "board 1",
          columnStatus: [
            {
              idColumnStatus: 1,
              name: "todo",
              order: 1,
              tasks: [
                {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "done", subtasks: []},
                {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "pending", subtasks: []},
                {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "pending", subtasks: []}
              ]
            }
          ]
        }
      ];
      const idColumn = 1;
      const tasks: Task[] = [
        {idTask: 4, title: "task 4", description: "description 4", order: 1, status: "done", subtasks: []},
        {idTask: 5, title: "task 5", description: "description 5", order: 2, status: "todo", subtasks: []}
      ];
  
      service.updateTaskInColumn(idColumn, tasks).subscribe(updatedBoard => {
        const column = updatedBoard?.columnStatus.find(column => column.idColumnStatus == idColumn);
        expect(column?.tasks).toEqual(tasks);
      });
    });
  
    it('should return undefined if column is not found', () => {
      service['boards'] = [
        {
          idBoard: 1,
          name: "board 1",
          columnStatus: [
            {
              idColumnStatus: 1,
              name: "todo",
              order: 1,
              tasks: []
            }
          ]
        }
      ];
      const idColumn = 3;
      const tasks: Task[] = [
        {idTask: 4, title: "task 4", description: "description 4", order: 1, status: "done", subtasks: []},
        {idTask: 5, title: "task 5", description: "description 5", order: 2, status: "todo", subtasks: []}
      ];
  
      service.updateTaskInColumn(idColumn, tasks).subscribe(updatedBoard => {
        expect(updatedBoard).toBeUndefined();
      });
    });
  })

  describe("updateSubtaskStatusInTask", () => {
    it("should update the subtask status if id substask exists", () => {
      service['boards'] = [
        {
          idBoard: 1,
          name: "board 1",
          columnStatus: [
            {
              idColumnStatus: 1,
              name: "todo",
              order: 1,
              tasks: [
                {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "done", subtasks: []},
                {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "pending", subtasks: [
                  {idSubtask: 1, title: "subtask 1", isDone: true},
                  {idSubtask: 2, title: "subtask 2", isDone: false},
                ]},
                {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "pending", subtasks: []}
              ]
            }
          ]
        }
      ];
      service.updateSubtaskStatusInTask(2, true).subscribe(updatedBoard => {
        expect(updatedBoard?.columnStatus[0].tasks[0].subtasks[1].isDone).toBeTruthy();
      })
    })
    it("should not update the subtask status if id substask dont exist", () => {
      service['boards'] = [
        {
          idBoard: 1,
          name: "board 1",
          columnStatus: [
            {
              idColumnStatus: 1,
              name: "todo",
              order: 1,
              tasks: [
                {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "done", subtasks: []},
                {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "pending", subtasks: [
                  {idSubtask: 1, title: "subtask 1", isDone: true},
                  {idSubtask: 2, title: "subtask 2", isDone: false},
                ]},
                {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "pending", subtasks: []}
              ]
            }
          ]
        }
      ];
      service.updateSubtaskStatusInTask(5, true).subscribe(updatedBoard => {
        expect(updatedBoard?.columnStatus[0].tasks[0].subtasks[1].isDone).toBeFalsy();
      })
    })
  })

  describe("udpateStatus", () => {
    it("should update status of task if id task exists", () => {
      service['boards'] = [
        {
          idBoard: 1,
          name: "board 1",
          columnStatus: [
            {
              idColumnStatus: 1,
              name: "todo",
              order: 1,
              tasks: [
                {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "todo", subtasks: []},
                {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "todo", subtasks: []},
                {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "todo", subtasks: []}
              ]
            },
            {
              idColumnStatus: 2,
              name: "progress",
              order: 2,
              tasks: [
                {idTask: 4, title: "task 4", description: "description 4", order: 1, status: "progress", subtasks: []},
                {idTask: 5, title: "task 5", description: "description 5", order: 2, status: "progress", subtasks: []}
              ]
            }
          ]
        }
      ];
      service.updateStatus(2, "progress").subscribe(updatedBoard => {
        expect(updatedBoard?.columnStatus[1].tasks).toHaveLength(3);
        expect(updatedBoard?.columnStatus[1].tasks[2].idTask).toBe(2);
        expect(updatedBoard?.columnStatus[0].tasks[1].idTask).toBe(3);
      })
    })

    it("should not update status of task if id task dont exists", () => {
      service['boards'] = [
        {
          idBoard: 1,
          name: "board 1",
          columnStatus: [
            {
              idColumnStatus: 1,
              name: "todo",
              order: 1,
              tasks: [
                {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "todo", subtasks: []},
                {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "todo", subtasks: []},
                {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "todo", subtasks: []}
              ]
            },
            {
              idColumnStatus: 2,
              name: "progress",
              order: 2,
              tasks: [
                {idTask: 4, title: "task 4", description: "description 4", order: 1, status: "progress", subtasks: []},
                {idTask: 5, title: "task 5", description: "description 5", order: 2, status: "progress", subtasks: []}
              ]
            }
          ]
        }
      ];
      service.updateStatus(6, "progress").subscribe(updatedBoard => {
        expect(updatedBoard?.columnStatus[1].tasks).toHaveLength(2);
        expect(updatedBoard?.columnStatus[1].tasks[1].idTask).toBe(5);
        expect(updatedBoard?.columnStatus[0].tasks[1].idTask).toBe(2);
      })
    })
  })

  describe("addTask", () => {
    it("should add task and assign id", () => {
      service['boards'] = [
        {
          idBoard: 1,
          name: "board 1",
          columnStatus: [
            {
              idColumnStatus: 1,
              name: "todo",
              order: 1,
              tasks: [
                {idTask: 1, title: "task 1", description: "description 1", order: 1, status: "todo", subtasks: [
                  {idSubtask: 1, title: "new subtask 1", isDone: true}, 
                  {idSubtask: 2, title: "new subtask 2", isDone: false}
                ]},
                {idTask: 2, title: "task 2", description: "description 2", order: 2, status: "todo", subtasks: []},
                {idTask: 3, title: "task 2", description: "description 3", order: 3, status: "todo", subtasks: []}
              ]
            }
          ]
        }
      ];
      const mockTask:Task = {
        idTask: 0, 
        title: "new task", 
        description: "",
        status: "todo",
        subtasks: [
          {idSubtask: 0, title: "new subtask 1", isDone: false}, 
          {idSubtask: 0, title: "new subtask 2", isDone: false}
        ]}
      service.addTask(1, mockTask).subscribe(updatedBoard => {
        expect(updatedBoard?.columnStatus[0].tasks).toHaveLength(4);
        expect(updatedBoard?.columnStatus[0].tasks[3].idTask).toBe(4);
        expect(updatedBoard?.columnStatus[0].tasks[3].subtasks[0].idSubtask).toBe(3);
      })
    })
  })

});
