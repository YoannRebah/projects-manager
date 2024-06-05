import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  private RGBToHex(r: number, g: number, b: number): string {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  getBodyBgColorBase16(): string {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
  
    if (!bgColor) {
      return "#000000";
    }
  
    const rgbMatch = bgColor.match(/\d+/g);
  
    if (!rgbMatch || rgbMatch.length < 3) {
      return "#000000";
    }
  
    const r = parseInt(rgbMatch[0], 10);
    const g = parseInt(rgbMatch[1], 10);
    const b = parseInt(rgbMatch[2], 10);
    const base16Color = this.RGBToHex(r, g, b);
  
    return base16Color;
  }

}
