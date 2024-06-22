import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { WindowRefService } from '../services/utilities/window-ref.service';

@Directive({
  selector: '[directiveScrollDownFade]',
  standalone: true
})

export class ScrollDownFadeDirective {
  private lastScrollTop: number = 0;
  private scrollDownFaseClassName: string = 'opacity-50';

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private windowRefService: WindowRefService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let scrollTop = this.windowRefService.windowRef.scrollY

    if (scrollTop > this.lastScrollTop) {
      this.renderer.addClass(this.el.nativeElement, this.scrollDownFaseClassName);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.scrollDownFaseClassName);
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.removeClass(this.el.nativeElement, this.scrollDownFaseClassName);
  }

}