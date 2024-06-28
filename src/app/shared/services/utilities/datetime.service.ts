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

  public static calculateDiffTimestamp(timestamp: number): number {
    const now: number = new Date().getTime();
    const meteorTimestamp: number = new Date(timestamp).getTime();
    const difference = now - meteorTimestamp;
    return difference;
  }

  public static formatTime(number: number): string {
    return String(number).padStart(2, '0');
  }

}
