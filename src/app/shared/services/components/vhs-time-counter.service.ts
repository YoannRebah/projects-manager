import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VhsTimeCounterService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private isRunningSubject = new BehaviorSubject<boolean>(false);
  isRunning$ = this.isRunningSubject.asObservable();

  constructor() { }

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

  start(): void {
    this.isRunningSubject.next(true);
  }

  stop(): void {
    this.isRunningSubject.next(false);
  }

}
