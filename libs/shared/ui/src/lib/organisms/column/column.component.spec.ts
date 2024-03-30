import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';
import { NgxsModule, Store } from '@ngxs/store';
import { BoardState, Task } from '@board-management/shared-store';
import { MockComponent } from 'ng-mocks';
import { TaskComponent } from '../../molecules/task/task.component';
import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;
  let store:Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnComponent, NgxsModule.forRoot([BoardState]), MockComponent(TaskComponent), DragDropModule],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('drop', () => {
    it('should move item in array and dispatch UpdateTasksInColumn action if previousContainer equals container', () => {
      const mockTasks: Task[] = [{ idTask: 1, title: 'Task 1', status: 'ToDo', subtasks: [], description: "" }, { idTask: 2, title: 'Task 2', status: 'ToDo', subtasks: [], description: "" }];
      const mockData = {data: mockTasks};
      component.columnStatus = { idColumnStatus: 1, name: 'ToDo', tasks: mockTasks, order: 1 };
      const mockDropEvent: any = {
        previousContainer: <any>mockData,
        container: <any>mockData,
        previousIndex: 0,
        currentIndex: 1
      };
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      component.drop(mockDropEvent);
      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should move item in array and dispatch UpdateTasksInColumn action if previousContainer equals container and columnStatus is undefined', () => {
      const mockTasks: Task[] = [{ idTask: 1, title: 'Task 1', status: 'ToDo', subtasks: [], description: "" }, { idTask: 2, title: 'Task 2', status: 'ToDo', subtasks: [], description: "" }];
      const mockData = {data: mockTasks};
      component.columnStatus = undefined;
      const mockDropEvent: any = {
        previousContainer: <any>mockData,
        container: <any>mockData,
        previousIndex: 0,
        currentIndex: 1
      };
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      component.drop(mockDropEvent);
      expect(dispatchSpy).toHaveBeenCalled();
    });

    it('should transfer item between arrays, update status and dispatch UpdateTasksInColumn action if previousContainer not equals container', () => {
      const mockPreviousTasks: Task[] = [{ idTask: 1, title: 'Task 1', status: 'ToDo', subtasks: [], description: "" }];
      const mockCurrentTasks: Task[] = [{ idTask: 2, title: 'Task 2', status: 'InProgress', subtasks: [], description: ""  }];
      const mockDropEvent: any = {
        previousContainer: <any>{ data: mockPreviousTasks, element: { nativeElement: { dataset: { idcolumn: '1' } } } },
        container: <any>{ data: mockCurrentTasks, element: { nativeElement: { dataset: { idcolumn: '2', columnname: 'InProgress' } } } },
        previousIndex: 0,
        currentIndex: 1
      };
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      component.drop(mockDropEvent);
      expect(dispatchSpy).toHaveBeenCalled();
      expect(mockCurrentTasks[1].status).toBe('InProgress');
    });

    it('should transfer item between arrays, update status and dispatch UpdateTasksInColumn action if previousContainer not equals container and columnName is not defined', () => {
      const mockPreviousTasks: Task[] = [{ idTask: 1, title: 'Task 1', status: 'ToDo', subtasks: [], description: "" }];
      const mockCurrentTasks: Task[] = [{ idTask: 2, title: 'Task 2', status: 'InProgress', subtasks: [], description: ""  }];
      const mockDropEvent: any = {
        previousContainer: <any>{ data: mockPreviousTasks, element: { nativeElement: { dataset: { idcolumn: '1' } } } },
        container: <any>{ data: mockCurrentTasks, element: { nativeElement: { dataset: { idcolumn: '2' } } } },
        previousIndex: 0,
        currentIndex: 1
      };
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      component.drop(mockDropEvent);
      expect(dispatchSpy).toHaveBeenCalled();
      expect(mockCurrentTasks[1].status).toBe('');
    });
  });

});
