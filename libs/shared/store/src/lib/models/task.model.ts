import { Subtask } from "./subtask.model";

export interface Task{
    idTask:number;
    title:string;
    description:string;
    subtasks:Subtask[];
    status:string;    
    order?:number;
    countSubtaskInDone?:number
  }