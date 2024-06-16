import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TimeoutService {
  
  constructor() { }

  public static get timeoutDelay(): number {
    return 5000;
  }

  public static setTimeout(action: () => void, milliseconds: number = TimeoutService.timeoutDelay): Promise<void> {
    return new Promise<void>(resolve => setTimeout(() => {
      action();
      resolve();
    }, milliseconds));
  }

}