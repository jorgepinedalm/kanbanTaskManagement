import { Component, Input, Provider, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {

  private innerCheckboxValue = false;
  @Input() inputId?:string;
  @Input() readonly:boolean;
  @Input() disabled:boolean;
  //propagate changes into the custom form control
  onChangeCheckboxCallback = (_:unknown) => {
  //foo
  }
    
  onTouchedCheckboxCallback = (_:unknown) => {
  //foo
  }
  constructor(){
    this.disabled = false;
    this.readonly = false;

  }

  get value(): boolean {
    return this.innerCheckboxValue;
  }

  //set accessor including call the onchange callback
  set value(v: boolean) {
      if (v !== this.innerCheckboxValue) {
          this.innerCheckboxValue = v;
          this.onChangeCheckboxCallback(v);
      }
  }

  writeValue(value: boolean): void {
    if (value !== this.innerCheckboxValue) {
      this.innerCheckboxValue = value;
    }
  }
  registerOnChange(fn: never): void {
    this.onChangeCheckboxCallback = fn;
  }
  registerOnTouched(fn: never): void {
    this.onTouchedCheckboxCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
