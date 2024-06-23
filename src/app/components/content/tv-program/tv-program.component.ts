import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TvProgramService } from '../../../shared/services/components/tv-program.service';
import { TimeCounterService } from '../../../shared/services/components/time-counter.service';
import { VhsEffectService } from '../../../shared/services/components/vhs-effect.service';
import { LoaderService } from '../../../shared/services/components/loader.service';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';
import { BlockSignalTvComponent } from '../../base/block-signal-tv/block-signal-tv.component';

@Component({
  selector: 'app-tv-program',
  standalone: true,
  imports: [CommonModule, BlockSignalTvComponent],
  templateUrl: './tv-program.component.html',
  styleUrl: './tv-program.component.scss'
})

export class TvProgramComponent implements OnInit, OnDestroy {
  private tvProgramIsVisibleSubscription!: Subscription;
  private tvProgramIsPlayingSubscription!: Subscription;
  private timeCounterSubscription!: Subscription;
  isVisible: boolean = false;
  isPlaying: boolean = false;
  isShown: boolean = false;
  timeTimeCounter: number = 0;
  videoDurationTime: number = 227; // 227
  delayBeforeShow: number = 600; // 600
  timeBeforeHide: number = this.delayBeforeShow + this.videoDurationTime;

  constructor(
    private tvProgramService: TvProgramService,
    private timeCounterService: TimeCounterService,
    private vhsEffectService: VhsEffectService,
    private loaderService: LoaderService
  ) {}

  @ViewChild('tvProgramVideo') tvProgramVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.vhsEffectService.showFooter();
    this.subscribeTvProgramIsVisible();
    this.subscribeTvProgramIsPlaying();
    this.subscribeTimeCounterService();
  }

  ngOnDestroy(): void {
    this.unsubscribeTvProgramIsVisible();
    this.unsubscribeTvProgramIsPlaying();
    this.unsubscribeTimeCounterService();
  }

  // tv program is playing
  subscribeTvProgramIsPlaying(): void {
    this.tvProgramIsPlayingSubscription = this.tvProgramService.isPlaying$.subscribe({
      next: (isPlaying) => {
        this.isPlaying = isPlaying;
        if(this.isVisible && isPlaying) {
          this.playVideo();
        }
      },
      error: (e) => console.error('error subscribeTvProgramIsPlaying : ', e)
    })
  }

  unsubscribeTvProgramIsPlaying(): void {
    if(this.tvProgramIsPlayingSubscription) {
      this.tvProgramIsPlayingSubscription.unsubscribe();
    }
  }

  // tv program is visible
  subscribeTvProgramIsVisible(): void {
    this.tvProgramIsVisibleSubscription = this.tvProgramService.isVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
      error: (e) => console.error('error subscribeTvProgramIsVisible : ', e)
    });
  }

  unsubscribeTvProgramIsVisible(): void {
    if (this.tvProgramIsVisibleSubscription) {
      this.tvProgramIsVisibleSubscription.unsubscribe();
    }
  }

  // time counter service
  subscribeTimeCounterService(): void {
    this.timeCounterSubscription = this.timeCounterService.time$.subscribe({
      next: (time) => {
        this.timeTimeCounter = time;
        if (this.timeTimeCounter >= this.delayBeforeShow && this.timeTimeCounter <= this.timeBeforeHide) {
          if (!this.isShown) {
            this.show();
          }
        }
        if (this.timeTimeCounter > this.timeBeforeHide) {
          this.hide();
        }
      },
      error: (e) => console.error('error subscribeTimeCounterService : ', e)
    });
  }

  unsubscribeTimeCounterService(): void {
    if (this.timeCounterSubscription) {
      this.timeCounterSubscription.unsubscribe();
    }
  }

  show(): void {
    this.tvProgramService.show();
    TimeoutService.setTimeout(()=>{
      this.playVideo();
      this.vhsEffectService.hideFooter();
      this.isShown = true;
    }, 500);
  }

  hide(): void {
    this.tvProgramService.hide();
    this.stopVideo();
    this.loaderService.toggle();
    this.vhsEffectService.showFooter();
    this.toggleTimeCounterIsPaused();
    this.unsubscribeTimeCounterService();
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

  toggleTimeCounterIsPaused(): void {
    this.timeCounterService.togglePause(true);
    TimeoutService.setTimeout(()=>{
      this.timeCounterService.togglePause(false);
    });
  }

  onClickHideVideo(): void {
    this.hide();
  }

}