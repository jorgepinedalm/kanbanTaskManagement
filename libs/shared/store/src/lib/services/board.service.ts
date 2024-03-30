import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Observable, of } from 'rxjs';
import { MockDataService } from './mock-data.service';
import { ColumnStatus } from '../models/column-status.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boards:Board[];
  
  constructor(private _mockDataService:MockDataService) { 
    this.boards = this._mockDataService.getBoards();
  }

  fetchBoards():Observable<Board[]>{
    return of(this.boards);
  }

  getBoardById(id:number):Observable<Board | undefined>{
    return of(this.boards.find(board => board.idBoard == id))
  }

  addBoards(boardData:Board):Observable<Board>{
    this.boards = [...this.boards, boardData];
    return of(this.boards[this.boards.length - 1]);
  }

  deleteBoard(id:number){
    return of(this.boards.filter(board => board.idBoard != id));
  }

  updateBoard(payload:Board,id:number){
    let foundBoard = this.boards.find(board => board.idBoard == id);
    if(foundBoard){
      foundBoard = {...foundBoard, ...payload};
    }
    return of(foundBoard);
  }

  getStatusFromBoard(idBoard:number):Observable<ColumnStatus[]>{
    let status:ColumnStatus[] = [];
    const board = this.boards.find(board => board.idBoard == idBoard);
    if(board){
      status = board.columnStatus;
    }
    return of(status);
  }

  addColumn(idBoard: number, column:ColumnStatus):Observable<Board>{
    const foundBoard = this.boards.find(board => board.idBoard == idBoard);
    if(foundBoard){
      column.idColumnStatus = this.getNextColumnId();
      foundBoard.columnStatus.push(column);
    }
    return of(foundBoard as Board);
  }

  /**
   * Generate id of new task
   */
  private getNextColumnId():number{
    let maxId = 0;
    for(const board of this.boards){
      for (const column of board.columnStatus) {
        if (column.idColumnStatus > maxId) {
          maxId = column.idColumnStatus;
        }
      }
    }
    return maxId + 1;
  }
}
