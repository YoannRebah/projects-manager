import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DomService {
  
  constructor() { }

  public static isColliding(rect1: DOMRect, rect2: DOMRect): boolean {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
  }

}