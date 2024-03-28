import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board, BoardState, GetBoardById } from '@board-management/shared-store';
import { UIEventsService } from "@board-management/ui";
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent implements OnInit, OnDestroy {

  @Select(BoardState.selectSelectedBoard) selectedBoard$?: Observable<Board>;
  subscriptions: Subscription[];
  board?:Board;

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _uiEventService: UIEventsService
    ){
      this.subscriptions = [];
      this.getRouteParam();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }
  ngOnInit(): void {
    this.getDataBoard();
    this.getClickedTask();
  }

  getRouteParam(): void{
    this._route.params
    .subscribe(params => {
      const idBoard:number = +params["id"];
      if(idBoard) this._store.dispatch(new GetBoardById(idBoard));
    });
  }

  getDataBoard(): void{
    const subscription = this.selectedBoard$?.subscribe(board => {
      this.board = board;
    }) as Subscription;
    this.subscriptions.push(subscription);
  }

  getClickedTask(): void {
    this._uiEventService.clickTask().subscribe(task => {
      if(task){
        console.log({task});
      }
    })
  }
}
