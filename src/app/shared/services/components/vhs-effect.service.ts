import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VhsEffectService {
  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSubject.asObservable();

  private footerIsVisibleSubject = new BehaviorSubject<boolean>(false);
  footerIsVisible$ = this.footerIsVisibleSubject.asObservable();

  constructor() { }

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

  showFooter(): void {
    this.footerIsVisibleSubject.next(true);
  }

  hideFooter(): void {
    this.footerIsVisibleSubject.next(false);
  }

}
