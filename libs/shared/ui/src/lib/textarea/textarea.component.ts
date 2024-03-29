import { Component, Input, Provider, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true
};

@Component({
  selector: 'lib-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR]
})
export class TextareaComponent  implements ControlValueAccessor {

  private innerTextareaValue = false;
  @Input() inputId?:string;
  @Input() styleClass?:string;
  @Input() placeholder?:string;
  @Input() rows:string;
  @Input() maxLength:string;
  @Input() disabled:boolean;
  @Input() required:boolean;

  //propagate changes into the custom form control
  onChangeTextareaCallback = (_:unknown) => {
  //foo
  }
  
  onTouchedTextareaCallback = (_:unknown) => {
  //foo
  }
  constructor(){
    this.maxLength = "9999";
    this.disabled = false;
    this.required = false;
    this.rows = "2";
  }
  get value(): boolean {
    return this.innerTextareaValue;
  }

  //set accessor including call the onchange callback
  set value(v: boolean) {
      if (v !== this.innerTextareaValue) {
          this.innerTextareaValue = v;
          this.onChangeTextareaCallback(v);
      }
  }
  writeValue(value: boolean): void {
    if (value !== this.innerTextareaValue) {
      this.innerTextareaValue = value;
    }
  }
  registerOnChange(fn: never): void {
    this.onChangeTextareaCallback = fn;
  }
  registerOnTouched(fn: never): void {
    this.onTouchedTextareaCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
