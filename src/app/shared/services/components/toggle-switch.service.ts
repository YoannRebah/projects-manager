import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleSwitchService {
  private isCheckedSubjects: Map<string, BehaviorSubject<boolean>> = new Map();

  constructor() { }

  check(id: string): void {
    if (!this.isCheckedSubjects.has(id)) {
      this.isCheckedSubjects.set(id, new BehaviorSubject<boolean>(true));
    } else {
      this.isCheckedSubjects.get(id)?.next(true);
    }
  }

  uncheck(id: string): void {
    if (this.isCheckedSubjects.has(id)) {
      this.isCheckedSubjects.get(id)?.next(false);
    }
  }

  isChecked$(id: string) {
    if (!this.isCheckedSubjects.has(id)) {
      this.isCheckedSubjects.set(id, new BehaviorSubject<boolean>(false));
    }
    return this.isCheckedSubjects.get(id)!.asObservable();
  }
}
