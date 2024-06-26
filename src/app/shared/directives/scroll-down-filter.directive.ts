import { Directive, inject, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { WindowRefService } from '../services/utilities/window-ref.service';

@Directive({
  selector: '[directiveScrollDownFilter]',
  standalone: true
})

export class ScrollDownFilterDirective {
  windowTopPosition: number = 0;
  grayscaleValue: number = 0;
  opacityValue: number = 0;

  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  windowRefService = inject(WindowRefService);

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.windowTopPosition = this.windowRefService.windowTopPosition;
    this.grayscaleValue = Math.min(this.windowTopPosition / 300, 1);
    this.opacityValue = parseFloat((1 - (this.windowTopPosition / 500)).toFixed(3));

    if (this.grayscaleValue <= 1) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'filter', `grayscale(${this.grayscaleValue})`);
    }
    if (this.opacityValue >= 0) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'opacity', this.opacityValue.toString());
    }
  }

}
