import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeoutService } from '../utilities/timeout.service';

@Injectable({
  providedIn: 'root'
})

export class LoaderHourglassService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  constructor() { }

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

  toggle(): void {
    this.show();
    TimeoutService.setTimeout(()=>{
      this.hide();
    });
  }
}