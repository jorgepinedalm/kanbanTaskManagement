import { Component, Input, Provider, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "primeng/dropdown";
import { NG_VALUE_ACCESSOR, FormsModule, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'lib-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class DropdownComponent implements ControlValueAccessor {
  private innerValue: unknown = '';
  @Input() options:unknown[];
  @Input() inputId?:string; 
  @Input() disabled:boolean;
  @Input() optionLabel?:string;
  @Input() optionValue?:string;
  @Input() filter:boolean;
  @Input() placeholder?:string;
  @Input() required:boolean;
  @Input() styleClass?:string;
  @Input() panelStyleClass?:string;

  //propagate changes into the custom form control
  onChangeDropdownCallback = (_:unknown) => {
  //foo
  }

  onTouchedDropdownCallback = (_:unknown) => {
  //foo
  }

  constructor(){
    this.options = [];
    this.disabled = false;
    this.required = false;
    this.filter = false;
  }

  get value(): unknown {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: unknown) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeDropdownCallback(v);
      }
  }

  writeValue(value: unknown): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  registerOnChange(fn: never): void {
    this.onChangeDropdownCallback = fn;
  }
  registerOnTouched(fn: never): void {
    this.onTouchedDropdownCallback = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
