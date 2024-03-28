import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board, BoardState, GetBoardById } from '@board-management/shared-store';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {

  @Select(BoardState.selectSelectedBoard) selectedBoard$?: Observable<Board>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
    ){
      this.getRouteParam();
  }

  getRouteParam(): void{
    this.route.params
    .subscribe(params => {
      const idBoard:number = +params["id"];
      if(idBoard) this.store.dispatch(new GetBoardById(idBoard));
    });
  }
}
