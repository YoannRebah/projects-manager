import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToggleSwitchService {
  private toggleSwitchStates: { [key: string]: boolean } = {};

  check(id: string): void {
    this.toggleSwitchStates[id] = true;
  }

  uncheck(id: string): void {
    this.toggleSwitchStates[id] = false;
  }

  getState(id: string): boolean {
    return this.toggleSwitchStates[id] || false;
  }

}