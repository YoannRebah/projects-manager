import { Directive, ElementRef, Renderer2, HostListener, inject } from '@angular/core';
import { WindowRefService } from '../services/utilities/window-ref.service';

@Directive({
  selector: '[directiveScrollDownFade]',
  standalone: true
})

export class ScrollDownFadeDirective {
  lastScrollTop: number = 0;
  scrollDownFadeClassName: string = 'opacity-50';
  mouseIsInsideElement: boolean = false;
  
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  windowRefService = inject(WindowRefService);

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let scrollTop = this.windowRefService.windowRef.scrollY
    if (scrollTop > this.lastScrollTop && !this.mouseIsInsideElement) {
      this.renderer.addClass(this.elementRef.nativeElement, this.scrollDownFadeClassName);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.scrollDownFadeClassName);
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseIsInsideElement = true;
    this.renderer.removeClass(this.elementRef.nativeElement, this.scrollDownFadeClassName);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseIsInsideElement = false;
  }

}