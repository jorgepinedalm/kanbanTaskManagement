import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanBoardComponent } from './kanban-board.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UIEventsService } from '@board-management/ui';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from '@board-management/shared-store';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanBoardComponent],
      imports: [RouterTestingModule, NgxsModule.forRoot([BoardState])],
      providers: [UIEventsService, DialogService]
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
