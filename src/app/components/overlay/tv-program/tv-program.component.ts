import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TvProgramService } from '../../../shared/services/tv-program.service';
import { TimeCounterService } from '../../../shared/services/time-counter.service';
import { VhsEffectService } from '../../../shared/services/vhs-effect.service';

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
  private tvProgramIsVisibleSubscription!: Subscription;
  timeTimeCounter: number = 0;
  videoDurationTime: number = 227;
  delayBeforeShow: number = 600;
  delayBeforeHide: number = this.delayBeforeShow + this.videoDurationTime;

  constructor(
    private tvProgramService: TvProgramService,
    private timeCounterService: TimeCounterService,
    private vhsEffectService: VhsEffectService
  ) {}

  @ViewChild('tvProgramVideo') tvProgramVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.timeCounterSubscription = this.timeCounterService.time$.subscribe(time => {
      this.timeTimeCounter = time;
      if (this.timeTimeCounter >= this.delayBeforeShow && this.timeTimeCounter < this.delayBeforeHide) {
        this.show();
      } else {
        this.hide();
      }
    });
    this.tvProgramIsVisibleSubscription = this.tvProgramService.isVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
      if (isVisible) {
        this.playVideo();
        this.hideVhsEffectFooter();
      } else {
        this.stopVideo();
        this.showVhsEffectFooter();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timeCounterSubscription) {
      this.timeCounterSubscription.unsubscribe();
    }
    if (this.tvProgramIsVisibleSubscription) {
      this.tvProgramIsVisibleSubscription.unsubscribe();
    }
  }

  show(): void {
    this.tvProgramService.show();
  }

  hide(): void {
    this.tvProgramService.hide();
  }

  playVideo(): void {
    if (this.tvProgramVideo && this.tvProgramVideo.nativeElement) {
      this.tvProgramVideo.nativeElement.play();
    }
  }

  stopVideo(): void {
    if (this.tvProgramVideo && this.tvProgramVideo.nativeElement) {
      this.tvProgramVideo.nativeElement.pause();
      this.tvProgramVideo.nativeElement.currentTime = 0;
    }
  }

  onClickHideVideo(): void {
    this.hide();
  }

  showVhsEffectFooter(): void {
    this.vhsEffectService.showFooter();
  }

  hideVhsEffectFooter(): void {
    this.vhsEffectService.hideFooter();
  }

}