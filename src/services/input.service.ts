import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InputService {
  private inputsState: Map<string, BehaviorSubject<boolean>> = new Map();

  constructor() {}

  initInputState(id: string, initialState: boolean = false): void {
    if (!this.inputsState.has(id)) {
      this.inputsState.set(id, new BehaviorSubject<boolean>(initialState));
    }
  }

  setInputState(id: string, checked: boolean): void {
    const inputState = this.inputsState.get(id);
    if (inputState) {
      inputState.next(checked);
    } else {
      this.initInputState(id, checked);
    }
  }

  getInputState(id: string): Observable<boolean> {
    if (!this.inputsState.has(id)) {
      this.initInputState(id, false);
    }
    return this.inputsState.get(id)!.asObservable();
  }

  getCurrentInputState(id: string): boolean {
    const inputState = this.inputsState.get(id);
    return inputState ? inputState.getValue() : false;
  }
}