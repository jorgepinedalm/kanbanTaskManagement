import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChangeCallback on value change', () => {
    const spy = jest.spyOn(component, 'onChangeDropdownCallback');

    // Manually update the value
    component.value = true;
    fixture.detectChanges();

    // Expect the onChangeCallback to have been called
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should be disabled via ControlValueAccessor methods', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBe(true);
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

  describe("registerOnTouched", () => {
    it("should onTouchedDropdownCallback to be defined", () => {
      const mockFuntion = jest.fn();
      component.registerOnChange(<never>mockFuntion);
      expect(component.onTouchedDropdownCallback).toBeDefined();
    })
  })
});
