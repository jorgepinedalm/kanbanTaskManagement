import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanBoardRoutingModule } from './kanban-board-routing.module';
import { KanbanBoardComponent } from './kanban-board.component';
import { ColumnComponent } from '@board-management/ui';

@NgModule({
  declarations: [KanbanBoardComponent],
  imports: [CommonModule, KanbanBoardRoutingModule, ColumnComponent],
})
export class KanbanBoardModule {}
