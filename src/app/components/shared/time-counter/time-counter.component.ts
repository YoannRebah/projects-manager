import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

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
  timeoutDelay: number = 5000;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    let timeout = setTimeout(()=>{
      this.initTimer();
      clearTimeout(timeout)
    }, this.timeoutDelay)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.subscription = timer$.subscribe(() => {
        this.ngZone.run(() => {
          this.updateTime();
          this.cdr.detectChanges();
        });
      });
    });
  }

  formatTime(number: number): string {
    return String(number).padStart(2, '0');
  }

  updateTime(): void {
    const hours = Math.floor(this.time / 3600);
    const minutes = Math.floor((this.time % 3600) / 60);
    const seconds = this.time % 60;

    this.timeString = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    this.time++;
  }
}