import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanBoardRoutingModule } from './kanban-board-routing.module';
import { KanbanBoardComponent } from './kanban-board.component';
import { ColumnComponent } from '@board-management/ui';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [KanbanBoardComponent],
  imports: [CommonModule, KanbanBoardRoutingModule, ColumnComponent, DragDropModule, DynamicDialogModule],
  providers: [DialogService]
})
export class KanbanBoardModule {}
