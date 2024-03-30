import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent, CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, FormsModule],
      providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on click', () => {
    const checkboxElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkboxElement).toBeTruthy();

    // Simulate a click event on the checkbox
    checkboxElement.click();
    fixture.detectChanges();

    // Expect the value to be updated to true
    expect(component.value).toBe(true);

    // Simulate a second click event on the checkbox
    checkboxElement.click();
    fixture.detectChanges();

    // Expect the value to be updated back to false
    expect(component.value).toBe(false);
  });

  it('should be disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const checkboxElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkboxElement.disabled).toBe(true);
  });

  it('should call onChangeCallback on value change', () => {
    const spy = jest.spyOn(component, 'onChangeCheckboxCallback');

    // Manually update the value
    component.value = true;
    fixture.detectChanges();

    // Expect the onChangeCallback to have been called
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should be disabled via ControlValueAccessor methods', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const checkboxElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkboxElement.disabled).toBe(true);
  });

  it('should call writeValue to set the initial value', () => {
    const initialValue = true;
    component.writeValue(initialValue);
  
    expect(component.value).toEqual(initialValue);
  });
  
  it('should call registerOnChange to set the onChange callback', () => {
    const onChangeCallback = jest.fn();
    component.registerOnChange(<never>onChangeCallback);
  
    component.value = true;
    expect(onChangeCallback).toHaveBeenCalledWith(true);
  });
});
