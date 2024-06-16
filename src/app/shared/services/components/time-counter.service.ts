import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeCounterService {
  private runningSubject = new BehaviorSubject<boolean>(false);
  isRunning$ = this.runningSubject.asObservable();

  private timeFollowingSubject = new BehaviorSubject<number>(0);
  time$ = this.timeFollowingSubject.asObservable();

  private isPausedSubject = new BehaviorSubject<boolean>(false);
  isPaused$ = this.isPausedSubject.asObservable();

  constructor() { }

  // running
  start(): void {
    this.isPausedSubject.next(false);
    this.runningSubject.next(true);
  }

  stop(): void {
    this.runningSubject.next(false);
  }

  togglePause(isPaused: boolean): void {
    this.isPausedSubject.next(isPaused);
    if (!isPaused) {
      this.runningSubject.next(true);
    } else {
      this.runningSubject.next(false);
    }
  }

  // time following
  setTime(time: number): void {
    this.timeFollowingSubject.next(time);
  }
}