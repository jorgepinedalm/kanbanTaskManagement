import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { StrikeOutTextDirective } from "./strikeOutText.directive";

describe('StrikeOutTextDirective', () => {
  let directive: StrikeOutTextDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    elementRef = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    TestBed.configureTestingModule({
      declarations: [StrikeOutTextDirective]
    });

    directive = new StrikeOutTextDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should not add "line-through" class by default', () => {
    expect(elementRef.nativeElement.classList.contains('line-through')).toBeFalsy();
  });

  it('should add "line-through" class when libStrikeOutText is true', () => {
    // Act
    directive.libStrikeOutText = true;
    directive.ngOnInit();

    // Assert
    expect(elementRef.nativeElement.classList.contains('line-through')).toBeTruthy();
  });

  it('should remove "line-through" class when libStrikeOutText is false', () => {
    // Arrange
    elementRef.nativeElement.classList.add('line-through');

    // Act
    directive.libStrikeOutText = false;
    directive.ngOnInit();

    // Assert
    expect(elementRef.nativeElement.classList.contains('line-through')).toBeFalsy();
  });

  it('should add "line-through" class when libStrikeOutText changes to true', () => {
    // Act
    directive.libStrikeOutText = true;
    directive.ngOnChanges(<any>{ libStrikeOutText: { currentValue: true } });

    // Assert
    expect(elementRef.nativeElement.classList.contains('line-through')).toBeTruthy();
  });

  it('should remove "line-through" class when libStrikeOutText changes to false', () => {
    // Arrange
    elementRef.nativeElement.classList.add('line-through');

    // Act
    directive.libStrikeOutText = false;
    directive.ngOnChanges(<any>{ libStrikeOutText: { currentValue: false } });

    // Assert
    expect(elementRef.nativeElement.classList.contains('line-through')).toBeFalsy();
  });
});
