import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TimeCounterService {
  private runningSubject = new BehaviorSubject<boolean>(false);
  isRunning$ = this.runningSubject.asObservable();

  private timeSubject = new BehaviorSubject<number>(0);
  time$ = this.timeSubject.asObservable();

  start() {
    this.runningSubject.next(true);
  }

  pause() {
    this.runningSubject.next(false);
  }

  reset() {
    this.pause();
    this.timeSubject.next(0);
    this.start();
  }

  setTime(time: number) {
    this.timeSubject.next(time);
  }
  
}