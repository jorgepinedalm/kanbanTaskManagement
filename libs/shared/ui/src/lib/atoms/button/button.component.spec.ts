import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit click event when button is clicked', () => {
    const emitSpy = jest.spyOn(component.clicked, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should set button type to "button" by default', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('should set button type to the specified value', () => {
    component.type = 'submit';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should set inputId attribute if provided', () => {
    component.inputId = 'testId';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('id')).toBe('testId');
  });

  it('should add specified style class to button', () => {
    component.styleClass = 'custom-button';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('custom-button')).toBe(true);
  });

  it('should enable button by default', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(false);
  });

  it('should disable button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });
});
