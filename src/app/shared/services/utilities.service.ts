import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  constructor() { }

  public static isColliding(rect1: DOMRect, rect2: DOMRect): boolean {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
  }

  public static isLocalStorageAvailable(): boolean {
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
