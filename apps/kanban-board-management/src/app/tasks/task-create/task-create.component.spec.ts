import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreateComponent } from './task-create.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgxsModule, Store } from '@ngxs/store';
import { BoardState, GetStatusFromBoard } from '@board-management/shared-store';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let store: Store;
  let formBuilder: FormBuilder;
  let ref: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateComponent, NgxsModule.forRoot([BoardState])],
      providers: [
        { provide: DynamicDialogConfig, useValue: { data: { idBoard: 1, Board: {} } } },
        { provide: DynamicDialogRef, useValue: {close: jest.fn()} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
    store = TestBed.inject(Store);
    ref = TestBed.inject(DynamicDialogRef);
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

  it('should remove subtask at the given index', () => {
    const subtasksArray: FormArray = formBuilder.array([
      formBuilder.group({
        title: 'Subtask 1',
        isDone: false
      }),
      formBuilder.group({
        title: 'Subtask 2',
        isDone: false
      }),
      formBuilder.group({
        title: 'Subtask 3',
        isDone: false
      })
    ]);

    component.taskForm = formBuilder.group({
      subtasks: subtasksArray
    });

    const indexToRemove = 1;

    component.deleteSubtask(indexToRemove);

    const subtasksAfterDelete: any[] = component.taskForm.get('subtasks')?.value;
    expect(subtasksAfterDelete.length).toEqual(2); // Check if subtask has been removed
    expect(subtasksAfterDelete[0].title).toEqual('Subtask 1'); // Check remaining subtasks
    expect(subtasksAfterDelete[1].title).toEqual('Subtask 3');
  });

  describe("saveTask", () => {
    it('should dispatch AddTasks action and close dialog if form is valid', () => {
      component.taskForm.patchValue(
        {
          title: 'Task title',
          description: 'Task description',
          status: 'todo',
        }
      )
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const closeSpy = jest.spyOn(ref, "close").mockImplementation(jest.fn());
  
      component.saveTask();
  
      expect(dispatchSpy).toHaveBeenCalled();
      expect(closeSpy).toHaveBeenCalled();
    });
    it('should not dispatch AddTasks action and close dialog if form is invalid', () => {
      const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(jest.fn());
      const closeSpy = jest.spyOn(ref, "close").mockImplementation(jest.fn());
  
      component.saveTask();
  
      expect(dispatchSpy).not.toHaveBeenCalled();
      expect(closeSpy).not.toHaveBeenCalled();
    });
  })
  

});
