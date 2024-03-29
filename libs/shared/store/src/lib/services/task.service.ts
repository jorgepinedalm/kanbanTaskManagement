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

  updateSubtaskStatusInTask(idSubtask:number, status: boolean):Observable<Board | undefined>{
    let foundBoard = undefined;
    for(const board of this.boards){
      for(const column of board.columnStatus){
        for(const task of column.tasks){
          const subtaskIndex = task.subtask.findIndex(subtask => subtask.idSubtask === idSubtask);
          if(subtaskIndex > -1){
            task.subtask[subtaskIndex].isDone = status;
            foundBoard = board;
            break;
          }
        }
      }
    }
    localStorage.setItem("boards", JSON.stringify(this.boards));
    return of(foundBoard);
  }

  updateStatus(id:number, columnStatus:string):Observable<Board | undefined>{
    let foundBoard = undefined;
    for(const board of this.boards){
      for(const column of board.columnStatus){
        const taskIndex = column.tasks.findIndex(task => task.idTask === id);
          if(taskIndex > -1){
            const targetColumn = board.columnStatus.find(column => column.name === columnStatus);
            column.tasks[taskIndex].status = columnStatus;
            targetColumn?.tasks.push(column.tasks[taskIndex]);
            column.tasks.splice(taskIndex, 1);
            foundBoard = board;
            break;
          }
      }
    }
    localStorage.setItem("boards", JSON.stringify(this.boards));
    return of(foundBoard);
  }
}
