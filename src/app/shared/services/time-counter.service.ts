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

  // running
  start(): void {
    this.runningSubject.next(true);
  }

  pause(): void {
    this.runningSubject.next(false);
  }

  // time following
  reset(): void {
    this.pause();
    this.timeFollowingSubject.next(0);
    this.start();
  }

  setTime(time: number): void {
    this.timeFollowingSubject.next(time);
  }
  
}