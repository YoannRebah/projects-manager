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
    if (this.windowRef) {
      return this.windowRef.scrollY || 0;
    }
    return 0;
  }

}