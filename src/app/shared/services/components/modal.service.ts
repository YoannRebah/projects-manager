import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  private isVisibleSubjects: Map<string, BehaviorSubject<boolean>> = new Map();

  constructor() { }

  show(id: string): void {
    if (!this.isVisibleSubjects.has(id)) {
      this.isVisibleSubjects.set(id, new BehaviorSubject<boolean>(true));
    } else {
      this.isVisibleSubjects.get(id)?.next(true);
    }
  }

  hide(id: string): void {
    if (this.isVisibleSubjects.has(id)) {
      this.isVisibleSubjects.get(id)?.next(false);
    }
  }

  isVisible$(id: string) {
    if (!this.isVisibleSubjects.has(id)) {
      this.isVisibleSubjects.set(id, new BehaviorSubject<boolean>(false));
    }
    return this.isVisibleSubjects.get(id)!.asObservable();
  }

}