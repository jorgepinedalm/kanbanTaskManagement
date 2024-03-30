import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MockComponent } from 'ng-mocks';
import { CheckboxComponent, DropdownComponent } from '@board-management/ui';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { BoardState, ColumnStatus } from '@board-management/shared-store';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let store: Store;
  let mockBoardState: BoardState;
  let mockColumnStatus$: BehaviorSubject<ColumnStatus[] | undefined>;

  

  beforeEach(async () => {

    mockColumnStatus$ = new BehaviorSubject<ColumnStatus[] | undefined>(undefined);

    mockBoardState = {
      selectStateColumnStatus: jest.fn(() => mockColumnStatus$) 
    } as unknown as BoardState;

    await TestBed.configureTestingModule({
      imports: [TaskDetailComponent, MockComponent(CheckboxComponent), MockComponent(DropdownComponent), NgxsModule.forRoot([BoardState])],
      providers: [
        { provide: DynamicDialogConfig, 
          useValue: { data: { idBoard: 1, Board: {} } } },
          { provide: Select, useValue: () => of() },
          { provide: BoardState, useValue: mockBoardState }

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should get column status and count subtasks in done", () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const getColumnStatusSpy = jest.spyOn(component, "getColumnStatus").mockImplementation(jest.fn());
      const countSubtaskInDoneSpy = jest.spyOn(component, "countSubtaskInDone").mockImplementation(jest.fn());
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalled();
      expect(getColumnStatusSpy).toHaveBeenCalled();
      expect(countSubtaskInDoneSpy).toHaveBeenCalled();
    })
  })

  describe("getColumnStatus", () => {
    it("should get the column status", () => {
      Object.defineProperty(component, 'columnStatus$', { writable: true });  
      const mockColumns: ColumnStatus[] = [{idColumnStatus: 1, name: "todo", tasks: [], order: 1}];
      component.columnStatus$ = mockColumnStatus$.asObservable() as Observable<ColumnStatus[]>;
      mockColumnStatus$.next(mockColumns);
      
      component.getColumnStatus();

      expect(component.columnStatus).toEqual(mockColumns);
    })
  })

  describe("countSubtaskInDone", () => {
    it("should set countSubstakInDone in task according the subtask mark as done", () => {
      component.task = {
        idTask: 1,
        title: "Task 1",
        description: "",
        status: "todo",
        subtasks: [
          {idSubtask: 1, title: "subtask 1", isDone: true},
          {idSubtask: 2, title: "subtask 2", isDone: true},
          {idSubtask: 3, title: "subtask 3", isDone: false}
        ],
        countSubtaskInDone: 0
      }
      component.countSubtaskInDone();
      expect(component.task.countSubtaskInDone).toEqual(2);
    })
    it("should not set countSubstakInDone in task if it is not defined", () => {
      component.task = undefined;
      component.countSubtaskInDone();
      expect(component.task).toBeUndefined();
    })
  })
  describe("saveChange", () => {
    it("call count subtasks in done function adn save data", () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const countSubtaskInDoneSpy = jest.spyOn(component, "countSubtaskInDone").mockImplementation(jest.fn());
      component.saveChange({idSubtask: 1, title: "subtask 1", isDone: false});
      expect(dispatchSpy).toHaveBeenCalled();
      expect(countSubtaskInDoneSpy).toHaveBeenCalled();
    })
  })
  describe("changeStatus", () => {
    it("should save change status", () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      component.changeStatus({idTask: 1, title: "task 1", status: "todo", subtasks: [], description: ""});
      expect(dispatchSpy).toHaveBeenCalled();
    })
  })
});
