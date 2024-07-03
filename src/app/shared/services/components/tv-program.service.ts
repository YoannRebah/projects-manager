import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeoutService } from '../utilities/timeout.service';

@Injectable({
  providedIn: 'root'
})

export class TvProgramService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSubject.asObservable();

  constructor() { }

  show(): void {
    this.isVisibleSubject.next(true);
    TimeoutService.setTimeout(()=>{
      this.play();
    }, 100);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
    this.stop();
  }

  play(): void {
    this.isPlayingSubject.next(true);
  }

  stop(): void {
    this.isPlayingSubject.next(false);
  }

}
