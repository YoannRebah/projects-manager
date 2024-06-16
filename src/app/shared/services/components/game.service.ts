import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private runningSubject = new BehaviorSubject<boolean>(false);
  isRunning$ = this.runningSubject.asObservable();
  
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.visibilitySubject.asObservable();

  constructor() { }

  // running
  start(): void {
    this.runningSubject.next(true);
  }

  stop(): void {
    this.runningSubject.next(false);
  }

  // visible
  show(): void {
    this.visibilitySubject.next(true);
  }

  hide(): void {
    this.visibilitySubject.next(false);
  }
  
}