import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeComponent } from '../dark-mode/dark-mode.component';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, DarkModeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
