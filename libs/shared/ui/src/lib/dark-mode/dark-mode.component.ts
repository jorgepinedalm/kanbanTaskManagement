import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from '../switch/switch.component';

@Component({
  selector: 'lib-dark-mode',
  standalone: true,
  imports: [CommonModule, SwitchComponent],
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss',
})
export class DarkModeComponent {}
