import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeCounterComponent } from '../../shared/time-counter/time-counter.component';
import { VhsEffectService } from '../../../shared/services/vhs-effect.service';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-vhs-effect',
  standalone: true,
  imports: [CommonModule, TimeCounterComponent],
  templateUrl: './vhs-effect.component.html',
  styleUrl: './vhs-effect.component.scss'
})

export class VhsEffectComponent implements OnInit, OnDestroy {
  private vhsEffectSubscription!: Subscription;
  isFlashing: boolean = false;
  footerIsVisible: boolean = true;

  constructor(
    private vhsEffectService: VhsEffectService
  ) {}

  ngOnInit(): void {
    this.subscribeVhsEffect();
    this.autoToggleFlashAnimation();
  }

  ngOnDestroy(): void {
    this.unsubscribeVhsEffect();
  }

  subscribeVhsEffect(): void {
    this.vhsEffectSubscription = this.vhsEffectService.footerIsVisible$.subscribe({
      next: (footerIsVisible) => {
        this.footerIsVisible = footerIsVisible;
      },
      error: (e) => console.error('error subscribeVhsEffect', e)
    })
  }

  unsubscribeVhsEffect(): void {
    if(this.vhsEffectSubscription) {
      this.vhsEffectSubscription.unsubscribe();
    }
  }

  startFlashAnimation(): void {
    this.isFlashing = true;
  }

  stopFlashAnimation(): void {
    this.isFlashing = false;
  }

  autoToggleFlashAnimation(): void {
    this.startFlashAnimation();
    let timeout = setTimeout(()=>{
      this.stopFlashAnimation();
      clearTimeout(timeout);
    }, UtilitiesService.commonTimeoutDelay);
  }

  showFooter(): void {
    this.vhsEffectService.showFooter();
  }

  hideFooter(): void {
    this.vhsEffectService.hideFooter();
  }

}
