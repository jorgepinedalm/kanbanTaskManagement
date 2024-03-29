import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeComponent } from '../../molecules/dark-mode/dark-mode.component';
import { HideSideBarComponent } from '../../molecules/hide-side-bar/hide-side-bar.component';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, DarkModeComponent, HideSideBarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
