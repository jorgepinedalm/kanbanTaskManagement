import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { SimpleChanges } from '@angular/core';
import { UIEventsService } from '../../../services/ui-libs-events.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let _uiEventsService:UIEventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [UIEventsService]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    _uiEventsService = TestBed.inject(UIEventsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should update countSubtaskInDone when task changes', () => {
      const mockTask: any = { 
        subtasks: [{ isDone: true }, { isDone: false }, { isDone: true }] 
      };
      component.task = mockTask;
      const changes: SimpleChanges = {
        task: { 
          currentValue: mockTask, 
          previousValue: null, 
          firstChange: true, 
          isFirstChange: () => true 
        }
      };
      component.ngOnChanges(changes);
      expect(component.task?.countSubtaskInDone).toBe(2);
    });

    it('should not update countSubtaskInDone if task is not provided', () => {
      const changes: SimpleChanges = {
        task: { 
          currentValue: undefined, 
          previousValue: undefined, 
          firstChange: true, 
          isFirstChange: () => true 
        }
      };
      component.ngOnChanges(changes);
      expect(component.task?.countSubtaskInDone).toBeUndefined();
    });
  });

  describe("openTaskDetail", () => {
    it("should call onClick task from ui event services", () => {
      const onClickTaskSpy = jest.spyOn(_uiEventsService, "onClickTask").mockImplementation(jest.fn());
      component.openTaskDetail();
      expect(onClickTaskSpy).toHaveBeenCalled();
    })
  })
});
