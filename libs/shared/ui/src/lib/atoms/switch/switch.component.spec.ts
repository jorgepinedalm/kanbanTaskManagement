import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';
import { InputSwitchModule } from 'primeng/inputswitch';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent, InputSwitchModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should set disabled state correctly', () => {
    expect(component.disabled).toBe(false);
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });

  it('should set default values for readonly and disabled', () => {
    expect(component.readonly).toBe(false);
    expect(component.disabled).toBe(false);
  });

  it('should set inputId if provided', () => {
    const inputId = 'test-id';
    component.inputId = inputId;
    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.getAttribute('id')).toBe(inputId);
  });
});
