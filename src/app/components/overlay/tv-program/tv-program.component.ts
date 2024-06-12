import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TvProgramService } from '../../../shared/services/tv-program.service';
import { TimeCounterService } from '../../../shared/services/time-counter.service';
import { VhsEffectService } from '../../../shared/services/vhs-effect.service';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-tv-program',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-program.component.html',
  styleUrls: ['./tv-program.component.scss']
})

export class TvProgramComponent implements OnInit, OnDestroy {
  private tvProgramIsVisibleSubscription!: Subscription;
  private timeCounterSubscription!: Subscription;
  isVisible: boolean = false;
  timeTimeCounter: number = 0;
  videoDurationTime: number = 10;
  delayBeforeShow: number = 10;
  timeBeforeHide: number = this.delayBeforeShow + this.videoDurationTime;
  mustBeHide: boolean = false;

  constructor(
    private tvProgramService: TvProgramService,
    private timeCounterService: TimeCounterService,
    private vhsEffectService: VhsEffectService
  ) {}

  @ViewChild('tvProgramVideo') tvProgramVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.showVhsEffectFooter();
    this.subscribeTvProgramIsVisible();
    this.subscribeTimeCounterService();
  }

  ngOnDestroy(): void {
    this.unsubscribeTvProgramIsVisible();
    this.unsubscribeTimeCounterService();
  }

  onClickHideVideo(): void {
    this.hide();
    this.mustBeHide = true;
  }

  // tv program is visible
  subscribeTvProgramIsVisible(): void {
    this.tvProgramIsVisibleSubscription = this.tvProgramService.isVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
      error: (e) => console.error('error subscribeTvProgramIsVisible', e)
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
        if(!this.mustBeHide) {
          if (this.timeTimeCounter >= this.delayBeforeShow && this.timeTimeCounter < this.timeBeforeHide) {
            this.show();
          }
          if (this.timeTimeCounter >= this.timeBeforeHide) {
            this.mustBeHide = true;
          }
        }
        if (this.mustBeHide) {
          this.hide();
        } 
      },
      error: (e) => console.error('error subscribeTimeCounterService', e)
    });
  }

  unsubscribeTimeCounterService(): void {
    if (this.timeCounterSubscription) {
      this.timeCounterSubscription.unsubscribe();
    }
  }

  show(): void {
    this.tvProgramService.show();
    this.playVideo();
    this.hideVhsEffectFooter();
    console.log('show()')
  }

  hide(): void {
    this.tvProgramService.hide();
    this.stopVideo();
    this.showVhsEffectFooter();
    console.log('hide()')
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

  showVhsEffectFooter(): void {
    this.vhsEffectService.showFooter();
  }

  hideVhsEffectFooter(): void {
    this.vhsEffectService.hideFooter();
  }

}