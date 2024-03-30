import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from '@board-management/shared-store';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnComponent, NgxsModule.forRoot([BoardState])],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
