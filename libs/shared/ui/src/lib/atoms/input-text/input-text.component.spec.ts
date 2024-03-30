import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputTextComponent, CUSTOM_INPUTTEXT_CONTROL_VALUE_ACCESSOR } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextComponent,FormsModule],
      providers: [CUSTOM_INPUTTEXT_CONTROL_VALUE_ACCESSOR]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial value correctly', () => {
    const initialValue = 'Initial Value';
    component.writeValue(initialValue);
    expect(component.value).toEqual(initialValue);
  });

  it('should call registerOnChange to set the onChange callback', () => {
    const onChangeCallback = jest.fn();
    component.registerOnChange(<never>onChangeCallback);

    const newValue = 'New Value';
    component.value = newValue;
    expect(onChangeCallback).toHaveBeenCalledWith(newValue);
  });

  it('should set disabled state correctly', () => {
    const isDisabled = true;
    component.setDisabledState(isDisabled);
    expect(component.disabled).toEqual(isDisabled);
  });
});
