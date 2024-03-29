import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';
import { MockDataService } from './mock-data.service';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private boards:Board[];
  
  constructor(private _mockDataService:MockDataService) { 
    this.boards = this._mockDataService.getBoards();
  }

  updateTaskInColumn(idColumn:number, tasks:Task[]):Observable<Board | undefined>{
    const board = this.boards.find(board => board.columnStatus.findIndex(column => column.idColumnStatus === idColumn) > -1);
    if(board){
      const column = board.columnStatus.find(column => column.idColumnStatus == idColumn);
      if (column) column.tasks = tasks;
    }
    localStorage.setItem("boards", JSON.stringify(this.boards));
    return of(board);
  }
}
