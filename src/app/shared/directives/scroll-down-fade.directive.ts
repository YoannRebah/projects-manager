import { Directive, ElementRef, Renderer2, HostListener, inject } from '@angular/core';
import { WindowRefService } from '../services/utilities/window-ref.service';

@Directive({
  selector: '[directiveScrollDownFade]',
  standalone: true
})

export class ScrollDownFadeDirective {
  private lastScrollTop: number = 0;
  private scrollDownFaseClassName: string = 'opacity-50';
  mouseIsInsideElement: boolean = false;
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  windowRefService = inject(WindowRefService);

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let scrollTop = this.windowRefService.windowRef.scrollY
    if (scrollTop > this.lastScrollTop && !this.mouseIsInsideElement) {
      this.renderer.addClass(this.elementRef.nativeElement, this.scrollDownFaseClassName);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.scrollDownFaseClassName);
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseIsInsideElement = true;
    this.renderer.removeClass(this.elementRef.nativeElement, this.scrollDownFaseClassName);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseIsInsideElement = false;
  }

}