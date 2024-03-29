import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() clicked:EventEmitter<boolean>;
  constructor(){
    this.type = "button";
    this.disabled = false;
    this.clicked = new EventEmitter<boolean>();
  }

  clickButton(): void {
    this.clicked.emit(true);
  }
}
