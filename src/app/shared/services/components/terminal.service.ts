import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TerminalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisibleSubject$ = this.isVisibleSubject.asObservable();

  constructor() { }

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

}