import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreateComponent } from './task-create.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgxsModule, Store } from '@ngxs/store';
import { BoardState, GetStatusFromBoard } from '@board-management/shared-store';
import { FormGroup } from '@angular/forms';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateComponent, NgxsModule.forRoot([BoardState])],
      providers: [
        { provide: DynamicDialogConfig, useValue: { data: { idBoard: 1, Board: {} } } },
        { provide: DynamicDialogRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("OnInit", () => {
    it("should get column status", () => {
      const getColumnStatusToCreateSpy = jest.spyOn(component, "getColumnStatusToCreate").mockImplementation(jest.fn());
      store.dispatch(new GetStatusFromBoard(1));
      component.ngOnInit();
      expect(getColumnStatusToCreateSpy).toHaveBeenCalled();
    })
  })

  it('should initialize form with required fields', () => {
    const expectedFormValues = {
      title: '',
      description: '',
      status: '',
      subtasks: []
    };

    const formGroup = component.taskForm;

    expect(formGroup).toBeInstanceOf(FormGroup);
    expect(formGroup.value).toEqual(expectedFormValues);
    expect(formGroup.get('title')).toBeTruthy();
    expect(formGroup.get('status')).toBeTruthy();
  });

  it('should add a subtask', () => {
    const initialSubtasksCount = component.subtasks.length;

    component.addSubtask();

    expect(component.subtasks.length).toBe(initialSubtasksCount + 1);
  });
});
