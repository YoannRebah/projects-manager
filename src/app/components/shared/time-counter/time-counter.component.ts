import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, Observable } from 'rxjs';
import { TimeCounterService } from '../../../shared/services/time-counter.service';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-time-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.scss']
})

export class TimeCounterComponent implements OnInit, OnDestroy {
  private timeCounterSubscription!: Subscription;
  private isRunningSubscription!: Subscription;
  private followingTimeSubscription!: Subscription;
  private isPausedSubscription!: Subscription;
  time: number = 0;
  timeString: string = '00:00:00';
  isPaused: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private timeCounterService: TimeCounterService
  ) {}

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
    this.timeString = `${UtilitiesService.formatTime(hours)}:${UtilitiesService.formatTime(minutes)}:${UtilitiesService.formatTime(seconds)}`;
  }

  showTimeCounterWithDelay(): void {
    UtilitiesService.commonTimeout(() => {
      this.timeCounterService.start();
    });
  }

  togglePause(): void {
    this.timeCounterService.togglePause(!this.isPaused);
  }
}
