import { Subtask } from "./subtask.model";

export interface Task{
    idTask:number;
    title:string;
    description:string;
    subtask:Subtask[];
    status:string;    
  }