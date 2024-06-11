import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VhsEffectService {
  private footerIsVisibleSubject = new BehaviorSubject<boolean>(false);
  footerIsVisible$ = this.footerIsVisibleSubject.asObservable();

  showFooter(): void {
    this.footerIsVisibleSubject.next(true);
  }

  hideFooter(): void {
    this.footerIsVisibleSubject.next(false);
  }

}
