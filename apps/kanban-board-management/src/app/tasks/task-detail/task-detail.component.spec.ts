import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MockComponent } from 'ng-mocks';
import { CheckboxComponent, DropdownComponent } from '@board-management/ui';
import { NgxsModule } from '@ngxs/store';
import { BoardState } from '@board-management/shared-store';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailComponent, MockComponent(CheckboxComponent), MockComponent(DropdownComponent), NgxsModule.forRoot([BoardState])],
      providers: [{ provide: DynamicDialogConfig, useValue: { data: { idBoard: 1, Board: {} } } }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
