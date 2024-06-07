import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit {
  timerTime: number = 0;
  time: string = '00:00:00';

  ngOnInit(): void {
    this.updateTimer();
  }

  formatTime(number: number): string {
    return String(number).padStart(2, '0');
  }

  updateTimer(): void {
    const hours = Math.floor(this.timerTime / 3600);
    const minutes = Math.floor((this.timerTime % 3600) / 60);
    const seconds = this.timerTime % 60;

    this.time = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    this.timerTime++;
  }
}