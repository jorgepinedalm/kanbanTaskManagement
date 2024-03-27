import { ColumnStatus } from "./column-status.model";

export interface Board{
    idBoard:number;
    name:string;
    columnStatus:ColumnStatus[]
  }