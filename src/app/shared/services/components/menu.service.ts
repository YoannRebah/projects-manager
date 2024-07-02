import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  constructor() { }

  show() {
    this.isVisibleSubject.next(true);
  }

  hide() {
    this.isVisibleSubject.next(false);
  }
}