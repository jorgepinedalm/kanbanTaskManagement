import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent, HeaderComponent, SidebarComponent, UIEvent, UIEventsService } from "@board-management/ui";
import { BoardsComponent } from './boards/boards.component';
import { Select } from '@ngxs/store';
import { Board, BoardState } from '@board-management/shared-store';
import { Observable, Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, BoardsComponent, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'kanban-board-management';
  @Select(BoardState.selectSelectedBoard) selectedBoard$?: Observable<Board>;
  subscription: Subscription;
  board?:Board;

  constructor(private uiEventsService:UIEventsService){
    this.subscription = new Subscription();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getSelectedBoard();
  }

  getSelectedBoard(): void{
    this.subscription = this.selectedBoard$?.subscribe(board => {
      this.board = board;
    }) as Subscription;
  }

  showNewTaskButton():void{
    this.uiEventsService.setEvent({action:UIEvent.clickNewTask})
  }
  
}
