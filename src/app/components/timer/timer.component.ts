import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit, OnDestroy {
  time: string = '00:00:00';
  private subscription?: Subscription;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private startTimer(): void {
    const timerObservable = new Observable<number>(observer => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next(count++);
      }, 1000);

      return () => clearInterval(intervalId);
    });

    this.subscription = timerObservable.subscribe(() => {
      this.updateTimer();
    });
  }

  private stopTimer(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateTimer(): void {
    const now = new Date();
    const hours = this.formatTime(now.getHours());
    const minutes = this.formatTime(now.getMinutes());
    const seconds = this.formatTime(now.getSeconds());
    this.time = `${hours}:${minutes}:${seconds}`;
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}