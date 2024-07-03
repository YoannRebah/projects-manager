import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VhsFooterService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  constructor() { }

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

}
