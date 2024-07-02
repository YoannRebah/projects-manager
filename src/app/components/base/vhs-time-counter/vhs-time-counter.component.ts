import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WindowRefService } from '../../../shared/services/utilities/window-ref.service';
import { DatetimeService } from '../../../shared/services/utilities/datetime.service';
import { LocalStorageService } from '../../../shared/services/utilities/local-storage.service';
import { VhsTimeCounterService } from '../../../shared/services/components/vhs-time-counter.service';
import { Subscription } from 'rxjs';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';

@Component({
  selector: 'app-vhs-time-counter',
  standalone: true,
  imports: [],
  templateUrl: './vhs-time-counter.component.html',
  styleUrl: './vhs-time-counter.component.scss'
})

export class VhsTimeCounterComponent implements OnInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  private isRunningSubscription!: Subscription;
  private isPausedSubscription!: Subscription;
  // private setTimeSubscription!: Subscription;
  isVisible: boolean = false;
  isPaused: boolean = false;
  isRunning: boolean = false;
  time: number = 0;
  timeMin: number = 0;
  timeMax: number = 9999;
  timeString: string = '00:00:00';
  timeIntervalId!: number;
  keyTime: string = LocalStorageService.commonPrefixKey + 'time';
  windowRefService = inject(WindowRefService);
  vhsTimeCounterService = inject(VhsTimeCounterService);

  constructor() {}

  ngOnInit(): void {
    this.subscribeIsVisible();
    this.subscribeIsRunning();
    this.subscribeIsPaused();
    // this.subscribeSetTime();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
    this.unsubscribeIsRunning();
    this.unsubscribeIsPaused();
    // this.unsubscribeSetTime();
  }

  // is visible
  subscribeIsVisible(): void {
    this.isVisibleSubscription = this.vhsTimeCounterService.isVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      }
    })
  }

  unsubscribeIsVisible(): void {
    if(this.isVisibleSubscription) {
      this.isVisibleSubscription.unsubscribe();
    }
  }

  // is running
  subscribeIsRunning(): void {
    this.isRunningSubscription = this.vhsTimeCounterService.isRunning$.subscribe({
      next: (isRunning) => {
        this.isRunning = isRunning;
        if(isRunning) {
          this.start();
        } else {
          this.stop();
        }
      }
    })
  }

  unsubscribeIsRunning(): void {
    if(this.isRunningSubscription) {
      this.isRunningSubscription.unsubscribe();
    }
  }

  // is paused
  subscribeIsPaused(): void {
    this.isPausedSubscription = this.vhsTimeCounterService.isPaused$.subscribe({
      next: (isPaused) => {
        this.isPaused = isPaused;
        if(isPaused) {
          this.pause();
        } else {
          this.resume();
        }
      }
    })
  }

  unsubscribeIsPaused(): void {
    if(this.isPausedSubscription) {
      this.isPausedSubscription.unsubscribe();
    }
  }

  // set time
  // subscribeSetTime(): void {
  //   this.setTimeSubscription = this.vhsTimeCounterService.time$.subscribe({
  //     next: (time) => {
  //       this.time = time;
  //     }
  //   })
  // }

  // unsubscribeSetTime(): void {
  //   if(this.setTimeSubscription) {
  //     this.setTimeSubscription.unsubscribe();
  //   }
  // }

  start(): void {
    this.updateTime();
  }

  stop(): void {
    clearInterval(this.timeIntervalId);
    this.time = this.timeMin;
    if (LocalStorageService.testIsAvailable()) {
      localStorage.setItem(this.keyTime, JSON.stringify(this.time));
    }
  }

  pause(): void {
    clearInterval(this.timeIntervalId);
  }

  resume(): void {
    this.updateTime();
  }

  get storedTime(): number {
    if (LocalStorageService.testIsAvailable()) {
      return parseInt(localStorage.getItem(this.keyTime)!, 10);
    }
    return 0;
  }

  storeTime(): void {
    if (LocalStorageService.testIsAvailable()) {
      localStorage.setItem(this.keyTime, JSON.stringify(this.time));
    }
  }

  setInitialTime(): void {
    if(this.storedTime) {
      this.time = this.storedTime;
    } else {
      this.time = this.timeMin;
    }
  }

  updateTime(): void {
    this.setInitialTime();
    const windowRef = this.windowRefService.windowRef;
    if (windowRef && this.time < this.timeMax) {
      this.timeIntervalId = windowRef.setInterval(() => {
        if (!this.isPaused) {
          this.time++;
          this.updateTimeString();
          this.storeTime();
        }
      }, 1000);
    }
  }

  updateTimeString(): void {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;
    this.timeString = `${DatetimeService.formatTime(hours)}:${DatetimeService.formatTime(minutes)}:${DatetimeService.formatTime(seconds)}`;
  }
}