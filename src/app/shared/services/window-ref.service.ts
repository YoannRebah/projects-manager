import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class WindowRefService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get windowRef(): any {
    if (isPlatformBrowser(this.platformId)) {
      return window;
    }
    return null;
  }

  public get windowTopPosition(): number {
    const win = this.windowRef;
    if (win) {
      return win.pageYOffset || win.document.documentElement.scrollTop || win.document.body.scrollTop || 0;
    }
    return 0;
  }

}