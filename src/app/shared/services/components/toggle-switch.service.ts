import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ToggleSwitchService {
  private isCheckedSubject: Map<string, BehaviorSubject<boolean>> = new Map();

  constructor() {}

  check(id: string): void {
    if (!this.isCheckedSubject.has(id)) {
      this.isCheckedSubject.set(id, new BehaviorSubject<boolean>(true));
    } else {
      this.isCheckedSubject.get(id)?.next(true);
    }
  }

  uncheck(id: string): void {
    if (this.isCheckedSubject.has(id)) {
      this.isCheckedSubject.get(id)?.next(false);
    }
  }

  // check(): void {
  //   this.isCheckedSubject.next(true);
  // }

  // uncheck(): void {
  //   this.isCheckedSubject.next(false);
  // }

  isChecked$(id: string) {
    if (!this.isCheckedSubject.has(id)) {
      this.isCheckedSubject.set(id, new BehaviorSubject<boolean>(false));
    }
    return this.isCheckedSubject.get(id)!.asObservable();
    // return this.isCheckedSubject.get(id)?.value;
  }
  
}