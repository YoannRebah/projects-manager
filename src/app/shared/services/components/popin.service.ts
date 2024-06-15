import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PopinService {
  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSubject.asObservable();

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }
}
