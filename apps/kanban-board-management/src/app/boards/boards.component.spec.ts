import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardsComponent } from './boards.component';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { Board, BoardState } from '@board-management/shared-store';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  let mockBoardState: BoardState;
  let mockSelectedBoard$: BehaviorSubject<Board | undefined>;
  let store:Store;
  let router:Router;

  beforeEach(async () => {

    mockSelectedBoard$ = new BehaviorSubject<Board | undefined>(undefined);

    mockBoardState = {
      selectSelectedBoard: jest.fn(() => mockSelectedBoard$) 
    } as unknown as BoardState;

    await TestBed.configureTestingModule({
      imports: [BoardsComponent, NgxsModule.forRoot([BoardState]), RouterTestingModule],
      providers: [
        { provide: Select, useValue: () => of() },
        { provide: BoardState, useValue: mockBoardState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should redirec to first board", () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const redirectToFirstBoardSpy = jest.spyOn(component, "redirectToFirstBoard").mockImplementation(jest.fn());
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalled();
      expect(redirectToFirstBoardSpy).toHaveBeenCalled();
    })
  })

  describe("redirectToFirstBoard", () => {
    it("should redirect to first board if boar length is greater than 0", () => {
      const mockBoard: Board = { idBoard: 1, name: "board 1", columnStatus: [] };
      Object.defineProperty(component, 'boards$', { writable: true });  
      component.boards$ = of([mockBoard]);
      const navigateByUrlSpy = jest.spyOn(router, "navigateByUrl").mockImplementation(jest.fn());
      component.redirectToFirstBoard();
      expect(navigateByUrlSpy).toHaveBeenCalled();
    })
    it("should not redirect to first board if boar length is equal than 0", () => {
      Object.defineProperty(component, 'boards$', { writable: true });  
      component.boards$ = of([]);
      const navigateByUrlSpy = jest.spyOn(router, "navigateByUrl").mockImplementation(jest.fn());
      component.redirectToFirstBoard();
      expect(navigateByUrlSpy).not.toHaveBeenCalled();
    })
  })
});
