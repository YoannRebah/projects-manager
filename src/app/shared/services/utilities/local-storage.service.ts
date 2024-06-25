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

  public static getNumberFromLocalStorage(key: string): number | null {
    if (LocalStorageService.testIsAvailable()) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        const parsedValue = Number(value);
        if (!isNaN(parsedValue)) {
          return parsedValue;
        }
      }
    }
    return null;
  }

  public static setInLocalStorage(key: string, value: any): void {
    if (LocalStorageService.testIsAvailable()) {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } else {
      console.warn('LocalStorage n\'est pas disponible.');
    }
  }

}
