import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[libStrikeOutText]',
  standalone: true,
})
export class StrikeOutTextDirective implements OnInit, OnChanges {
  @Input() libStrikeOutText: boolean;

  constructor(private el: ElementRef) {
    this.libStrikeOutText = false;
  }
  
  ngOnInit() {
    this.updateStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['libStrikeOutText']) {
      this.updateStyle();
    }
  }

  private updateStyle() {
    if (this.libStrikeOutText) {
      this.el.nativeElement.classList.add('line-through');
    } else {
      this.el.nativeElement.classList.remove('line-through');
    }
  }
}
