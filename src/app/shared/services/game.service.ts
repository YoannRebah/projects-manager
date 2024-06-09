import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  private runningSubject = new BehaviorSubject<boolean>(false);
  isRunning$ = this.runningSubject.asObservable();

  start() {
    this.runningSubject.next(true);
  }

  pause() {
    this.runningSubject.next(false);
  }

  reset() {
    this.runningSubject.next(false);
    this.runningSubject.next(true);
  }
}
