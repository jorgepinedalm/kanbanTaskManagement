import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board, BoardState, GetBoardById, Task } from '@board-management/shared-store';
import { CloseIconTaskTemplateComponent, UIEventsService } from "@board-management/ui";
import { Select, Store } from '@ngxs/store';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { TaskDetailComponent } from '../tasks/task-detail/task-detail.component';

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
    private _uiEventService: UIEventsService,
    public _dialogService: DialogService
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
        this.showTaskDetails(task);
      }
    })
  }

  showTaskDetails(task:Task): void {
    this._dialogService.open(TaskDetailComponent, {
      header: task.title,
      width: "33vw",
      modal:true,
      closable: true,
      closeOnEscape: true,
      dismissableMask: true,
      styleClass: "app-dynamic-dialog",
      breakpoints: {
          '1440px': '45vw',
          '1024px': '55vw',
          '640px': '90vw'
      },
      data: {
        id: task.idTask,
        idBoard: this.board?.idBoard,
        task:task
      },
      templates: {
        closeicon: CloseIconTaskTemplateComponent
      }
  });
  }
}
