import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks:Task[];
  
  constructor() { 
    this.tasks = [];
  }

  fetchTasks():Observable<Task[]>{
    return of(this.tasks);
  }

  getTaskById(id:number):Observable<Task | undefined>{
    return of(this.tasks.find(task => task.idTask == id))
  }

  addTasks(taskData:Task):Observable<Task>{
    return of(taskData);
  }

  deleteTask(id:number){
    return of(this.tasks.filter(task => task.idTask != id));
  }

  updateTask(payload:Task,id:number){
    let foundTask = this.tasks.find(task => task.idTask == id);
    if(foundTask){
      foundTask = {...foundTask, ...payload};
    }
    return of(foundTask);
  }

  changeOrder(id:number, position:number):Observable<number>{
    const foundTaskIndex = this.tasks.findIndex(task => task.idTask === id);
    if(foundTaskIndex > -1){
      const prevOrder = this.tasks[foundTaskIndex].order;
      this.tasks[foundTaskIndex].order = position;
      this.tasks[position].order = prevOrder;
    }
    return of(position);
  }
}
