import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
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
