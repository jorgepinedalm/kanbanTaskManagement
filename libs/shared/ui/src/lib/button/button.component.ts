import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() inputId?:string;
  @Input() type:string;
  @Input() styleClass?:string;
  @Input() disabled:boolean;
  constructor(){
    this.type = "button";
    this.disabled = false;
  }
}
