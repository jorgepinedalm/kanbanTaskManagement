import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanBoardComponent } from './kanban-board.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ColumnComponent, UIEvent, UIEventsService } from '@board-management/ui';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { Board, BoardState, Task } from '@board-management/shared-store';
import { MockComponent } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let store:Store;
  let mockBoardState: BoardState;
  let uiEventsService: UIEventsService;
  let mockSelectedBoard$: BehaviorSubject<Board | undefined>;
  let dialogService:DialogService;

  beforeEach(async () => {
    const uiEventsServiceMock = {
      clickTask: jest.fn(() => of()),
      onClickNewTask: jest.fn()
    };

    mockSelectedBoard$ = new BehaviorSubject<Board | undefined>(undefined);

    mockBoardState = {
      selectSelectedBoard: jest.fn(() => mockSelectedBoard$) 
    } as unknown as BoardState;

    await TestBed.configureTestingModule({
      declarations: [KanbanBoardComponent],
      imports: [RouterTestingModule, NgxsModule.forRoot([BoardState]), MockComponent(ColumnComponent)],
      providers: [
        UIEventsService, 
        DialogService,
        { provide: ActivatedRoute, useValue: {params: of({id: '1'})} },
        { provide: Select, useValue: () => of() },
        { provide: BoardState, useValue: mockBoardState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const mockBoard: Board = { idBoard: 1, name: "board 1", columnStatus: [] };
    Object.defineProperty(component, 'selectedBoard$', { writable: true });  
    component.selectedBoard$ = of(mockBoard); 
    store = TestBed.inject(Store);
    uiEventsService = TestBed.inject(UIEventsService);
    dialogService = TestBed.inject(DialogService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should call initial functions", () => {
      const getDataBoardSpy = jest.spyOn(component, "getDataBoard").mockImplementation(jest.fn());
      const listenUIEventsSpy = jest.spyOn(component, "listenUIEvents").mockImplementation(jest.fn());
      component.ngOnInit();
      expect(getDataBoardSpy).toHaveBeenCalled();
      expect(listenUIEventsSpy).toHaveBeenCalled();
    })
  })

  describe("getRouteParam", () => {
    it("should call store if param is defined", () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      component.getRouteParam();
      expect(dispatchSpy).toHaveBeenCalled();
    })
  })
  describe("getDataBoard", () => {
    it('should subscribe to selectedBoard$ on getSelectedBoard', () => {
      const mockBoard: Board = { idBoard: 1, name: "board 1", columnStatus: [] };
      component.selectedBoard$ = mockSelectedBoard$.asObservable() as Observable<Board>;
      mockSelectedBoard$.next(mockBoard);
      component.getDataBoard();
  
      expect(component.board).toEqual(mockBoard);
    });
  })

  describe("listenUIEvents", () => {
    it("should call showNewTaskModal when click new task is clicked", () => {
      const clickTaskSpy = jest.spyOn(uiEventsService, "eventClick").mockReturnValue(of({action: UIEvent.clickNewTask}));
      const showNewTaskModalSpy = jest.spyOn(component, "showNewTaskModal").mockImplementation(jest.fn());
      component.listenUIEvents();
      expect(clickTaskSpy).toHaveBeenCalled();
      expect(showNewTaskModalSpy).toHaveBeenCalled();
    })
    it("should not call showNewTaskModal when click new task is not clicked", () => {
      const clickTaskSpy = jest.spyOn(uiEventsService, "eventClick").mockReturnValue(of({action: UIEvent.clickTask}));
      const showTaskDetailsSpy = jest.spyOn(component, "showTaskDetails").mockImplementation(jest.fn());
      component.listenUIEvents();
      expect(clickTaskSpy).toHaveBeenCalled();
      expect(showTaskDetailsSpy).toHaveBeenCalled();
    })
  })

  describe("showTaskDetails", () => {
    it("should open dialog", () => {
      const openSpy = jest.spyOn(dialogService, "open").mockImplementation(jest.fn());
      const task:Task = {idTask: 1, title: "task 1", description: "", status: "todo", subtasks: []};
      component.showTaskDetails(task);
      expect(openSpy).toHaveBeenCalled();
    })
    it("should open dialog width board defined", () => {
      component.board = <any>{idBoard: 1};
      const openSpy = jest.spyOn(dialogService, "open").mockImplementation(jest.fn());
      const task:Task = {idTask: 1, title: "task 1", description: "", status: "todo", subtasks: []};
      component.showTaskDetails(task);
      expect(openSpy).toHaveBeenCalled();
    })
  })

  describe("showNewTaskModal", () => {
    it("should open dialog", () => {
      const openSpy = jest.spyOn(dialogService, "open").mockImplementation(jest.fn());
      component.showNewTaskModal();
      expect(openSpy).toHaveBeenCalled();
    })
    it("should open dialog with board defined", () => {
      component.board = <any>{idBoard: 1};
      const openSpy = jest.spyOn(dialogService, "open").mockImplementation(jest.fn());
      component.showNewTaskModal();
      expect(openSpy).toHaveBeenCalled();
    })
  })

  describe("showCreateColumn", () => {
    it("should open dialog", () => {
      const openSpy = jest.spyOn(dialogService, "open").mockImplementation(jest.fn());
      component.showCreateColumn();
      expect(openSpy).toHaveBeenCalled();
    })
    it("should open dialog with board defined", () => {
      component.board = <any>{idBoard: 1};
      const openSpy = jest.spyOn(dialogService, "open").mockImplementation(jest.fn());
      component.showCreateColumn();
      expect(openSpy).toHaveBeenCalled();
    })
  })
  
  
  
});
