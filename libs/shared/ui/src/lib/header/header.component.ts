import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Board, BoardState, GetBoards } from '@board-management/shared-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  
  @Select(BoardState.selectStateBoard) boards$?: Observable<Board[]>;

  constructor(private store: Store){}

  ngOnInit(): void {
    this.store.dispatch(new GetBoards());
  }
}
