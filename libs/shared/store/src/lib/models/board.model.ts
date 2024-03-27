import { ColumnStatus } from "./column-status.model";

export interface Board{
    idBoard:number;
    Board:number;
    name:string;
    columnStatus:ColumnStatus[]
  }