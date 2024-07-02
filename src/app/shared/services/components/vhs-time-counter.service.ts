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

  private isPausedSubject = new BehaviorSubject<boolean>(false);
  isPaused$ = this.isPausedSubject.asObservable();

  // private setTimeSubject = new BehaviorSubject<number>(0);
  // time$ = this.setTimeSubject.asObservable();

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

  pause(): void {
    this.isPausedSubject.next(true);
  }

  resume(): void {
    this.isPausedSubject.next(false);
  }

  // setTime(time: number): void {
  //   this.setTimeSubject.next(time);
  // }

}
