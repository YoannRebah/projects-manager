import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  constructor() { }

  public static get portfolioPrefixStorageKey(): string {
    return 'lsPortfolioYR_';
  }

  public static testIsAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

}
