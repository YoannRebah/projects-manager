import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeoutService } from '../utilities/timeout.service';

@Injectable({
  providedIn: 'root'
})

export class VhsEffectService {
  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSubject.asObservable();

  private footerIsVisibleSubject = new BehaviorSubject<boolean>(false);
  footerIsVisible$ = this.footerIsVisibleSubject.asObservable();

  private footerIsFlashingSubject = new BehaviorSubject<boolean>(false);
  footerIsFlashing$ = this.footerIsFlashingSubject.asObservable();

  constructor() { }

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

  showFooter(): void {
    this.footerIsVisibleSubject.next(true);
    this.toggleFooterFlashing();
  }

  hideFooter(): void {
    this.footerIsVisibleSubject.next(false);
  }

  startFooterFlashing(): void {
    this.footerIsFlashingSubject.next(true);
  }

  stopFooterFlashing(): void {
    this.footerIsFlashingSubject.next(false);
  }

  toggleFooterFlashing(): void {
    this.startFooterFlashing();
    TimeoutService.setTimeout(()=>{
      this.stopFooterFlashing();
    });
  }

}
