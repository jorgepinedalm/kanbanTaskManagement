import { Injectable } from '@angular/core';
import { Task } from '@board-management/shared-store';
import { BehaviorSubject, Observable } from 'rxjs';
import { UIEvents } from '../models/ui-events.model';

@Injectable({
  providedIn: 'root'
})
export class UIEventsService {

  private clickTask$: BehaviorSubject<Task | undefined>;
  private actionClick$: BehaviorSubject<UIEvents | null>;

  constructor() { 
    this.clickTask$ = new BehaviorSubject<Task | undefined>(undefined);
    this.actionClick$ = new BehaviorSubject<UIEvents | null>(null);
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

  eventClick(): Observable<UIEvents | null>{
    return this.actionClick$.asObservable();
  }

  setEvent(event:UIEvents): void {
    this.actionClick$.next(event);
  }
}
