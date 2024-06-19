import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ToggleSwitchService {
  private isCheckedSubject = new BehaviorSubject<boolean>(false);
  isChecked$ = this.isCheckedSubject.asObservable();

  constructor() {}

  check(): void {
    this.isCheckedSubject.next(true);
  }

  uncheck(): void {
    this.isCheckedSubject.next(false);
  }

  getCurrentState(): boolean {
    return this.isCheckedSubject.value;
  }
  
}