import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeoutService } from '../timeout.service';

@Injectable({
  providedIn: 'root'
})

export class VhsEffectService {
  private footerIsVisibleSubject = new BehaviorSubject<boolean>(false);
  footerIsVisible$ = this.footerIsVisibleSubject.asObservable();

  private footerIsFlashingSubject = new BehaviorSubject<boolean>(false);
  footerIsFlashing$ = this.footerIsFlashingSubject.asObservable();

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
