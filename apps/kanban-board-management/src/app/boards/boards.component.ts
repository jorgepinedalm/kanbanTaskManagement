import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board, BoardState, GetBoards } from '@board-management/shared-store';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent implements OnInit {
  @Select(BoardState.selectStateBoard) boards$?: Observable<Board[]>;

  constructor(private store:Store, private router:Router){}

  ngOnInit(): void {
    this.store.dispatch(new GetBoards());
    this.redirectToFirstBoard();
  }

  redirectToFirstBoard(): void {
    this.boards$?.subscribe(boards => {
      if(boards.length > 0) this.router.navigateByUrl(`kanban-board/${boards[0].idBoard}`).catch(err => console.error(err));
    })
  }
}
