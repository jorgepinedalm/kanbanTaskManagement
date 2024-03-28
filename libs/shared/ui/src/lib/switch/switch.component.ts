import { Component, Input, Provider, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

@Component({
  selector: 'lib-switch',
  standalone: true,
  imports: [CommonModule, FormsModule, InputSwitchModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SwitchComponent implements ControlValueAccessor {
  private innerSwitchValue = false;
  @Input() inputId?:string;
  @Input() readonly:boolean;
  @Input() disabled:boolean;
  //propagate changes into the custom form control
  onChangeSwitchCallback = (_:unknown) => {
  //foo
  }
  
  onTouchedSwitchCallback = (_:unknown) => {
  //foo
  }
  constructor(){
    this.disabled = false;
    this.readonly = false;

  }
  get value(): boolean {
    return this.innerSwitchValue;
  }

  //set accessor including call the onchange callback
  set value(v: boolean) {
      if (v !== this.innerSwitchValue) {
          this.innerSwitchValue = v;
          this.onChangeSwitchCallback(v);
      }
  }
  writeValue(value: boolean): void {
    if (value !== this.innerSwitchValue) {
      this.innerSwitchValue = value;
    }
  }
  registerOnChange(fn: never): void {
    this.onChangeSwitchCallback = fn;
  }
  registerOnTouched(fn: never): void {
    this.onTouchedSwitchCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
