import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '@board-management/shared-store';
import { UIEventsService } from './ui-libs-events.service';
import { UIEvent } from '../enums/UIEvent.enum';

describe('UIEventsService', () => {
  let service: UIEventsService;
  let clickTaskSubject: BehaviorSubject<Task | undefined>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIEventsService);
    clickTaskSubject = service['clickTask$'] as BehaviorSubject<Task | undefined>;
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

  describe("eventClick", () => {
    it("should get event click", () => {
      service.setEvent({action: UIEvent.clickTask});
      service.eventClick().subscribe(event => {
        expect(event?.action).toEqual(UIEvent.clickTask);
      })
    })
  })
});

