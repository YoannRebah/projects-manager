import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitlePopin]'
})

export class titlePopinDirective {

  @Input('appDataTitlePopin') popinContent!: string;

  popinElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.popinElement) {
      this.createPopin();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.popinElement) {
      this.popinElement.remove();
      this.popinElement = null;
    }
  }

  private createPopin() {
    this.popinElement = this.renderer.createElement('div');
    this.renderer.addClass(this.popinElement, 'title-popin');
    const textNode = this.renderer.createText(this.popinContent);
    this.renderer.appendChild(this.popinElement, textNode);
    const hostElement = this.elementRef.nativeElement;
    this.renderer.appendChild(hostElement, this.popinElement);
  }
}
