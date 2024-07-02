import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TerminalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisibleSubject$ = this.isVisibleSubject.asObservable();

  constructor() { }

  public static get enabledCommands(): string[] {
    return [
      'help',
      'show help',
      'hide help',
      'show loader',
      'hide loader',
      'toggle loader',
      'show tv',
      'hide tv',
      'play tv',
      'show vhs',
      'hide vhs'
    ];
  }

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

}