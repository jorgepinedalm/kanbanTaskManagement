import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent, SidebarComponent } from "@board-management/ui";
import { BoardsComponent } from './boards/boards.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, BoardsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'kanban-board-management';
}
