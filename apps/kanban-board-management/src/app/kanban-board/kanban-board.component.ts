import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board, BoardState, GetBoardById } from '@board-management/shared-store';
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
    private route: ActivatedRoute,
    private store: Store
    ){
      this.subscriptions = [];
      this.getRouteParam();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe);
  }
  ngOnInit(): void {
    this.getDataBoard();
  }

  getRouteParam(): void{
    this.route.params
    .subscribe(params => {
      const idBoard:number = +params["id"];
      if(idBoard) this.store.dispatch(new GetBoardById(idBoard));
    });
  }

  getDataBoard(): void{
    const subscription = this.selectedBoard$?.subscribe(board => {
      this.board = board;
    }) as Subscription;
    this.subscriptions.push(subscription);
  }
}
