import { Task } from "./task.models";

export interface ColumnStatus{
    idColumnStatus:number;
    name:string;
    color?:string;
    order:number;
    tasks:Task[];  
  }