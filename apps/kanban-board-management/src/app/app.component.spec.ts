import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent, HeaderComponent, SidebarComponent, UIEventsService } from '@board-management/ui';
import { BoardsComponent } from './boards/boards.component';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board, BoardState } from '@board-management/shared-store';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxsModule, Select } from '@ngxs/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let uiEventsServiceMock: Partial<UIEventsService>;
  let mockBoardState: BoardState;
  let mockSelectedBoard$: BehaviorSubject<Board | undefined>;

  beforeEach(async () => {
    uiEventsServiceMock = {
      onClickNewTask: jest.fn()
    };

    mockSelectedBoard$ = new BehaviorSubject<Board | undefined>(undefined);

    // Creamos un mock de BoardState
    mockBoardState = {
      selectSelectedBoard: jest.fn(() => mockSelectedBoard$) // Espiamos el método para devolver el observable mockeado
    } as unknown as BoardState; // Convertimos a BoardState

    

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(HeaderComponent),
        MockComponent(SidebarComponent),
        MockComponent(BoardsComponent),
        MockComponent(ButtonComponent),
      ],
      imports: [RouterTestingModule, NgxsModule.forRoot([BoardState])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: UIEventsService, useValue: uiEventsServiceMock },
        { provide: Select, useValue: () => of() }, // Mocking Ngxs Select,
        { provide: BoardState, useValue: mockBoardState }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    const mockBoard: Board = { idBoard: 1, name: "board 1", columnStatus: [] };
    Object.defineProperty(component, 'selectedBoard$', { writable: true });  
    component.selectedBoard$ = of(mockBoard); 
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSelectedBoard on initialization', () => {
    // Arrange
    const spy = jest.spyOn(component, 'getSelectedBoard');

    // Act
    component.ngOnInit();

    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe on component destroy', () => {
    // Arrange
    const spy = jest.spyOn(component.subscription, 'unsubscribe');

    // Act
    component.ngOnDestroy();

    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should subscribe to selectedBoard$ on getSelectedBoard', () => {
    // Arrange
    const mockBoard: Board = { idBoard: 1, name: "board 1", columnStatus: [] };
    component.selectedBoard$ = mockSelectedBoard$.asObservable() as Observable<Board>;
    mockSelectedBoard$.next(mockBoard);
    // Act
    component.getSelectedBoard();

    // Assert
    expect(component.board).toEqual(mockBoard);
  });

  it('should call onClickNewTask on showNewTaskButton', () => {
    // Act
    component.showNewTaskButton();

    // Assert
    expect(uiEventsServiceMock.onClickNewTask).toHaveBeenCalled();
  });
});
