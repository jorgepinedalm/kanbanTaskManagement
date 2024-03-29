import { Injectable } from '@angular/core';
import { Task } from '@board-management/shared-store';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIEventsService {

  private clickTask$: BehaviorSubject<Task | undefined>;
  private clickNewTask$: BehaviorSubject<boolean>;

  constructor() { 
    this.clickTask$ = new BehaviorSubject<Task | undefined>(undefined);
    this.clickNewTask$ = new BehaviorSubject<boolean>(false);
  }

  clickTask():Observable<Task | undefined>{
    return this.clickTask$.asObservable();
  }

  /**
   * set the clickted task in a libs template
   * @param task clicked task
   */
  onClickTask(task:Task ): void {
    this.clickTask$.next(task);
  }

  clickNewTask(): Observable<boolean>{
    return this.clickNewTask$.asObservable();
  }

  onClickNewTask(): void {
    this.clickNewTask$.next(true);
  }
}
