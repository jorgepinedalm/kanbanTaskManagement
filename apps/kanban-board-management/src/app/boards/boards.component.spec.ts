import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardsComponent } from './boards.component';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from '@board-management/shared-store';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsComponent, NgxsModule.forRoot([BoardState]), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
