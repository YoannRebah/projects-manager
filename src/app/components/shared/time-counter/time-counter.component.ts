import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { TimeCounterService } from '../../../shared/services/time-counter.service';

@Component({
  selector: 'app-time-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.scss']
})

export class TimeCounterComponent implements OnInit, OnDestroy {
  time: number = 0;
  timeString: string = '00:00:00';
  private subscription!: Subscription;
  private timerSubscription!: Subscription;
  timeoutDelay: number = 5000;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private timeCounterService: TimeCounterService
  ) {}

  ngOnInit(): void {
    this.subscription = this.timeCounterService.isRunning$.subscribe(
      (isRunning: boolean) => {
        if (isRunning) {
          this.startTimer();
        } else {
          this.pauseTimer();
        }
      }
    );
    let timeout = setTimeout(() => {
      this.timeCounterService.start();
      clearTimeout(timeout);
    }, this.timeoutDelay);
    this.timeCounterService.time$.subscribe(time => {
      this.time = time;
      this.updateTimeString();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.timerSubscription = timer$.subscribe(() => {
        this.ngZone.run(() => {
          this.updateTime();
          this.cdr.detectChanges();
        });
      });
    });
  }

  pauseTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  formatTime(number: number): string {
    return String(number).padStart(2, '0');
  }

  updateTime(): void {
    this.time++;
    this.timeCounterService.setTime(this.time);
  }

  updateTimeString(): void {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;

    this.timeString = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }
}