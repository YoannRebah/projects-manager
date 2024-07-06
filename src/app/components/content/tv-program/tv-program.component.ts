import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { TvProgramService } from '../../../shared/services/components/tv-program.service';
import { LocalStorageService } from '../../../shared/services/utilities/local-storage.service';
import { VhsEffectService } from '../../../shared/services/components/vhs-effect.service';
import { VhsFooterService } from '../../../shared/services/components/vhs-footer.service';
import { VhsTimeCounterService } from '../../../shared/services/components/vhs-time-counter.service';
import { LoaderService } from '../../../shared/services/components/loader.service';
import { BlockSignalTvComponent } from '../block-signal-tv/block-signal-tv.component';
import { WindowRefService } from '../../../shared/services/utilities/window-ref.service';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';

@Component({
  selector: 'app-tv-program',
  standalone: true,
  imports: [
    BlockSignalTvComponent
  ],
  templateUrl: './tv-program.component.html',
  styleUrl: './tv-program.component.scss'
})

export class TvProgramComponent implements OnInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  private isPlayingSubscription!: Subscription;
  isVisible: boolean = false;
  isPlaying: boolean = false;
  timeTimeCounter: number = 0;
  videoDurationTime: number = 227; // 227
  delayBeforeShow: number = 600; // 600
  timeBeforeHide: number = this.delayBeforeShow + this.videoDurationTime;
  lsKeyTime: string = LocalStorageService.commonPrefixKey + 'time';
  timeIntervalId!: number;
  videoWasForcedHidden: boolean = false;
  tvProgramService = inject(TvProgramService);
  vhsEffectService = inject(VhsEffectService);
  loaderService = inject(LoaderService);
  LocalStorageService = inject(LocalStorageService);
  windowRefService = inject(WindowRefService);
  vhsFooterService = inject(VhsFooterService);
  vhsTimeCounterService = inject(VhsTimeCounterService);

  constructor() {}

  @ViewChild('tvProgramVideo') tvProgramVideo!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.subscribeIsVisible();
    this.subscribeTvProgramIsPlaying();
    this.checkIsTimeToShow();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
    this.unsubscribeIsPlaying();
  }

  // tv program is visible
  subscribeIsVisible(): void {
    this.isVisibleSubscription = this.tvProgramService.isVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
      error: (e) => console.error('error subscribeIsVisible : ', e)
    });
  }

  unsubscribeIsVisible(): void {
    if (this.isVisibleSubscription) {
      this.isVisibleSubscription.unsubscribe();
    }
  }

  // tv program is playing
  subscribeTvProgramIsPlaying(): void {
    this.isPlayingSubscription = this.tvProgramService.isPlaying$.subscribe({
      next: (isPlaying) => {
        this.isPlaying = isPlaying;
        if(isPlaying) {
          this.playVideo();
        } else {
          this.stopVideo();
        }
      },
      error: (e) => console.error('error subscribeTvProgramIsPlaying : ', e)
    })
  }

  unsubscribeIsPlaying(): void {
    if(this.isPlayingSubscription) {
      this.isPlayingSubscription.unsubscribe();
    }
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

  showVideo(): void {
    this.tvProgramService.show();
    this.vhsFooterService.hide();
  }

  hideVideo(): void {
    clearInterval(this.timeIntervalId);
    this.tvProgramService.hide();
    this.vhsFooterService.show();
    this.vhsTimeCounterService.stop();
    this.loaderService.show();
    TimeoutService.setTimeout(()=>{
      this.loaderService.hide();
      this.vhsTimeCounterService.start();
    });
  }

  onClickHideVideo(): void {
    this.hideVideo();
    this.videoWasForcedHidden = true;
  }

  get storedTime(): number {
    if (LocalStorageService.testIsAvailable()) {
      return parseInt(localStorage.getItem(this.lsKeyTime)!, 10);
    }
    return 0;
  }

  checkIsTimeToShow(): void {
    const windowRef = this.windowRefService.windowRef;
    if (windowRef) {
      this.timeIntervalId = windowRef.setInterval(() => {
        if(this.storedTime == this.delayBeforeShow) {
          this.showVideo();
        }
        if(this.storedTime == this.timeBeforeHide && !this.videoWasForcedHidden) {
          this.hideVideo();
        }
      }, 1000);
    }
  }

}