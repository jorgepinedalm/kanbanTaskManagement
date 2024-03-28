import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent, SidebarComponent } from "@board-management/ui";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'kanban-board-management';
}
