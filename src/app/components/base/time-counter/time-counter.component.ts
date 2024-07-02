import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { TimeCounterService } from '../../../shared/services/components/time-counter.service';
import { DatetimeService } from '../../../shared/services/utilities/datetime.service';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';

@Component({
  selector: 'app-time-counter',
  standalone: true,
  imports: [],
  templateUrl: './time-counter.component.html',
  styleUrl: './time-counter.component.scss'
})

export class TimeCounterComponent implements OnInit, OnDestroy {
  private timeCounterSubscription!: Subscription;
  private isRunningSubscription!: Subscription;
  private followingTimeSubscription!: Subscription;
  private isPausedSubscription!: Subscription;
  time: number = 0;
  timeString: string = '00:00:00';
  isPaused: boolean = false;
  timeCounterService = inject(TimeCounterService);
  cdr = inject(ChangeDetectorRef);
  ngZone = inject(NgZone);

  constructor() {}

  ngOnInit(): void {
    this.subscribeTimeCounterService();
    this.subscribeTimeCounterIsRunning();
    this.subscribeToIsPaused();
    this.showTimeCounterWithDelay();
  }

  ngOnDestroy(): void {
    this.unsubscribeTimeCounterService();
    this.unsubscribeTimeCounterIsRunning();
    this.unsubscribeFollowingTime();
    this.unsubscribeIsPaused();
  }

  // time counter service
  subscribeTimeCounterService(): void {
    this.timeCounterSubscription = this.timeCounterService.time$.subscribe({
      next: (time: number) => {
        this.time = time;
        this.updateTimeString();
      },
      error: (e) => console.error('error subscribeTimeCounterService', e)
    });
  }

  unsubscribeTimeCounterService(): void {
    if (this.timeCounterSubscription) {
      this.timeCounterSubscription.unsubscribe();
    }
  }

  // time running
  subscribeTimeCounterIsRunning(): void {
    this.isRunningSubscription = this.timeCounterService.isRunning$.subscribe({
      next: (isRunning: boolean) => {
        if (isRunning) {
          this.startTimer();
        } else {
          this.unsubscribeFollowingTime();
        }
      },
      error: (e) => console.error('error subscribeTimeCounterIsRunning', e)
    });
  }

  unsubscribeTimeCounterIsRunning(): void {
    if (this.isRunningSubscription) {
      this.isRunningSubscription.unsubscribe();
    }
  }

  // is paused
  subscribeToIsPaused(): void {
    this.isPausedSubscription = this.timeCounterService.isPaused$.subscribe({
      next: (isPaused: boolean) => {
        this.isPaused = isPaused;
      },
      error: (e) => console.error('error subscribeToIsPaused', e)
    });
  }

  unsubscribeIsPaused(): void {
    if (this.isPausedSubscription) {
      this.isPausedSubscription.unsubscribe();
    }
  }

  // time following
  subscribeFollowingTime(timer$: Observable<number>): void {
    this.followingTimeSubscription = timer$.subscribe({
      next: () => {
        this.ngZone.run(() => {
          if (!this.isPaused) {
            this.updateTime();
            this.cdr.detectChanges();
          }
        });
      },
      error: (e) => console.error('error subscribeFollowingTime', e)
    });
  }

  unsubscribeFollowingTime(): void {
    if (this.followingTimeSubscription) {
      this.followingTimeSubscription.unsubscribe();
    }
  }

  startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.subscribeFollowingTime(timer$);
    });
  }

  updateTime(): void {
    this.time++;
    this.timeCounterService.setTime(this.time);
  }

  updateTimeString(): void {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;
    this.timeString = `${DatetimeService.formatTime(hours)}:${DatetimeService.formatTime(minutes)}:${DatetimeService.formatTime(seconds)}`;
  }

  showTimeCounterWithDelay(): void {
    TimeoutService.setTimeout(() => {
      this.timeCounterService.start();
    });
  }

  togglePause(): void {
    this.timeCounterService.togglePause(!this.isPaused);
  }
}
