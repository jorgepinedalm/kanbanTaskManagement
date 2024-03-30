import { Task } from "./task.model";

export interface ColumnStatus{
    idColumnStatus:number;
    name:string;
    color?:string;
    order?:number;
    tasks:Task[];  
  }