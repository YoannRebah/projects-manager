import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TvProgramService } from '../../../shared/services/tv-program.service';
import { TimeCounterService } from '../../../shared/services/time-counter.service';

@Component({
  selector: 'app-tv-program',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-program.component.html',
  styleUrls: ['./tv-program.component.scss']
})

export class TvProgramComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  private timeCounterSubscription!: Subscription;
  timeFromTimerCounterService: number = 0;
  maxTimeBeforeShowTvProgram: number = 10; // 20 seconds

  constructor(
    private tvProgramService: TvProgramService,
    private timeCounterService: TimeCounterService
  ) {}

  @ViewChild('tvProgramVideo') tvProgramVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.timeCounterSubscription = this.timeCounterService.time$.subscribe(time => {
      this.timeFromTimerCounterService = time;
      if (this.timeFromTimerCounterService >= this.maxTimeBeforeShowTvProgram) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timeCounterSubscription) {
      this.timeCounterSubscription.unsubscribe();
    }
  }

  show(): void {
    this.isVisible = true;
    this.tvProgramService.show();
    this.playVideo();
  }

  hide(): void {
    this.isVisible = false;
    this.tvProgramService.hide();
  }

  playVideo(): void {
    if (this.tvProgramVideo && this.tvProgramVideo.nativeElement) {
      this.tvProgramVideo.nativeElement.play();
      this.tvProgramVideo.nativeElement.play();
    }
  }

  onClickHideVideo(): void {
    this.hide();
    this.timeCounterService.reset();
  }

}