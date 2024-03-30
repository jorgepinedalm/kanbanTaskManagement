import { Task } from "@board-management/shared-store";
import { UIEvent } from "../enums/UIEvent.enum";

export interface UIEvents{
    action: UIEvent,
    data?: {
        task?:Task,
        idTask?:number
    }
}