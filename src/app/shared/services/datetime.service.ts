import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatetimeService {
  constructor() { }

  public static get timestampNow(): number {
    const now: Date = new Date();
    const timestamp: number = now.getTime(); 
    return timestamp;
  }

  public static formatTime(number: number): string {
    return String(number).padStart(2, '0');
  }

}
