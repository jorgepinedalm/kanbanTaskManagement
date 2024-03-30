import { Component, Input, Provider, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUTTEXT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputTextComponent),
  multi: true
};

@Component({
  selector: 'lib-input-text',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [CUSTOM_INPUTTEXT_CONTROL_VALUE_ACCESSOR]
})
export class InputTextComponent implements ControlValueAccessor {

  private innerInputValue = '';
  @Input() inputId?:string;
  @Input() styleClass?:string;
  @Input() type:string;
  @Input() placeholder?:string;
  @Input() maxLength:string;
  @Input() disabled:boolean;
  @Input() required:boolean;

  //propagate changes into the custom form control
  onChangeInputCallback = (_:unknown) => {
  //foo
  }
  
  onTouchedInputCallback = (_:unknown) => {
  //foo
  }
  constructor(){
    this.type = "text";
    this.maxLength = "9999";
    this.disabled = false;
    this.required = false;
  }
  get value(): string {
    return this.innerInputValue;
  }

  //set accessor including call the onchange callback
  set value(v: string) {
      if (v !== this.innerInputValue) {
          this.innerInputValue = v;
          this.onChangeInputCallback(v);
      }
  }
  writeValue(value: string): void {
    if (value !== this.innerInputValue) {
      this.innerInputValue = value;
    }
  }
  registerOnChange(fn: never): void {
    this.onChangeInputCallback = fn;
  }
  registerOnTouched(fn: never): void {
    this.onTouchedInputCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
