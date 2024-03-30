import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '@board-management/shared-store';
import { UIEventsService } from './ui-libs-events.service';

describe('UIEventsService', () => {
  let service: UIEventsService;
  let clickTaskSubject: BehaviorSubject<Task | undefined>;
  let clickNewTaskSubject: BehaviorSubject<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIEventsService);
    clickTaskSubject = service['clickTask$'] as BehaviorSubject<Task | undefined>;
    clickNewTaskSubject = service['clickNewTask$'] as BehaviorSubject<boolean>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('clickTask', () => {
    it('should return clickTask$ observable', () => {
      const clickTask$ = service.clickTask();
      expect(clickTask$).toBeInstanceOf(Observable);
    });

    it('should emit the clicked task when onClickTask is called', () => {
      const task: Task = { idTask: 1, title: 'Task 1', description: "", subtasks: [], order: 1, status: "todo"};
      let emittedTask: Task | undefined;
      const subscription = service.clickTask().subscribe((clickedTask) => {
        emittedTask = clickedTask;
      });
      service.onClickTask(task);
      expect(emittedTask).toBe(task);
      subscription.unsubscribe();
    });
  });

  describe('clickNewTask', () => {
    it('should return clickNewTask$ observable', () => {
      const clickNewTask$ = service.clickNewTask();
      expect(clickNewTask$).toBeInstanceOf(Observable);
    });

    it('should emit true when onClickNewTask is called', () => {
      let emittedValue: boolean | undefined;
      const subscription = service.clickNewTask().subscribe((value) => {
        emittedValue = value;
      });
      service.onClickNewTask();
      expect(emittedValue).toBe(true);
      subscription.unsubscribe();
    });
  });
});

