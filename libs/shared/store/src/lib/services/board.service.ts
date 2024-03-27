import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Observable, of } from 'rxjs';
import { MockDataService } from './mock-data.service';

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
}
