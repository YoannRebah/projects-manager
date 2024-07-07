import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { WindowRefService } from '../utilities/window-ref.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenWidthSubject: BehaviorSubject<number>;
  screenWidth$!: Observable<number>;
  
  private screenHeightSubject: BehaviorSubject<number>;
  screenHeight$!: Observable<number>;

  constructor(private windowRefService: WindowRefService) {
    const initialWidth = this.windowRefService.windowRef ? this.windowRefService.windowRef.innerWidth : 0;
    const initialHeight = this.windowRefService.windowRef ? this.windowRefService.windowRef.innerHeight : 0;

    this.screenWidthSubject = new BehaviorSubject<number>(initialWidth);
    this.screenWidth$ = this.screenWidthSubject.asObservable();
    
    this.screenHeightSubject = new BehaviorSubject<number>(initialHeight);
    this.screenHeight$ = this.screenHeightSubject.asObservable();

    if (this.windowRefService.windowRef) {
      this.updateScreenSize();
      fromEvent(this.windowRefService.windowRef, 'resize')
        .pipe(debounceTime(200))
        .subscribe(() => this.updateScreenSize());
    }
  }

  private updateScreenSize() {
    if (this.windowRefService.windowRef) {
      this.screenWidthSubject.next(this.windowRefService.windowRef.innerWidth);
      this.screenHeightSubject.next(this.windowRefService.windowRef.innerHeight);
    }
  }

  get screenWidth(): number {
    return this.screenWidthSubject.value;
  }

  get screenHeight(): number {
    return this.screenHeightSubject.value;
  }
}