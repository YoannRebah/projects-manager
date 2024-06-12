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
  private runningSubscription!: Subscription;
  private timeFollowingSubscription!: Subscription;
  time: number = 0;
  timeString: string = '00:00:00';

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private timeCounterService: TimeCounterService
  ) {}

  ngOnInit(): void {
    this.subscribeTimeCounterService();
    this.subscribeTimerRunning();
    
    let timeout = setTimeout(() => {
      this.timeCounterService.start();
      clearTimeout(timeout);
    }, UtilitiesService.commonTimeoutDelay);

  }

  ngOnDestroy(): void {
    this.unsubscribeTimeFollowing();
    this.unsubscribeTimerRunning();
  }

  // time counter service
  subscribeTimeCounterService(): void {
    this.timeCounterSubscription = this.timeCounterService.time$.subscribe(time => {
      this.time = time;
      this.updateTimeString();
    });
  }

  unsubscribeTimeCounterService(): void {
    if(this.timeCounterSubscription) {
      this.timeCounterSubscription.unsubscribe();
    }
  }

  // time running
  subscribeTimerRunning(): void {
    this.runningSubscription = this.timeCounterService.isRunning$.subscribe({
      next: (isRunning: boolean) => {
        if (isRunning) {
          this.startTimer();
        } else {
          this.pauseTimer();
        }
      },
      error: (e) => console.error('erreur subscribeToTimerRunning', e)
    }
    );
  }

  unsubscribeTimerRunning(): void {
    if(this.runningSubscription) {
      this.runningSubscription.unsubscribe();
    }
  }

  // time following
  subscribeTimeFollowing(timer$: Observable<number>): void {
    this.timeFollowingSubscription = timer$.subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.updateTime();
          this.cdr.detectChanges();
        });
      },
      error: (e) => console.error('error subscribeToTimeFollowing', e)
    });
  }

  unsubscribeTimeFollowing(): void {
    if (this.timeFollowingSubscription) {
      this.timeFollowingSubscription.unsubscribe();
    }
  }

  startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.subscribeTimeFollowing(timer$);
    });
  }

  pauseTimer(): void {
    this.unsubscribeTimeFollowing();
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
}