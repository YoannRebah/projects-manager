import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeCounterComponent } from '../../shared/time-counter/time-counter.component';
import { VhsEffectService } from '../../../shared/services/vhs-effect.service';

@Component({
  selector: 'app-vhs-effect',
  standalone: true,
  imports: [CommonModule, TimeCounterComponent],
  templateUrl: './vhs-effect.component.html',
  styleUrl: './vhs-effect.component.scss'
})

export class VhsEffectComponent implements OnInit, OnDestroy {
  private footerIsVisibleSubscription!: Subscription;
  private footerIsFlashingSubscription!: Subscription;
  footerIsFlashing: boolean = false;
  footerIsVisible: boolean = false;

  constructor(
    private vhsEffectService: VhsEffectService
  ) {}

  ngOnInit(): void {
    this.subscribeFooterIsVisible();
    this.subscribeFooterIsFlashing();
    this.showFooter();
  }

  ngOnDestroy(): void {
    this.unsubscribeFooterIsVisible();
    this.unsubscribeFooterIsFlashing();
  }

  // footer is visible
  subscribeFooterIsVisible(): void {
    this.footerIsVisibleSubscription = this.vhsEffectService.footerIsVisible$.subscribe({
      next: (footerIsVisible) => {
        this.footerIsVisible = footerIsVisible;
      },
      error: (e) => console.error('error subscribeFooterIsVisible', e)
    })
  }

  unsubscribeFooterIsVisible(): void {
    if(this.footerIsVisibleSubscription) {
      this.footerIsVisibleSubscription.unsubscribe();
    }
  }

  // footer is flashing
  subscribeFooterIsFlashing(): void {
    this.footerIsFlashingSubscription = this.vhsEffectService.footerIsFlashing$.subscribe({
      next: (footerIsFlashing) => {
        this.footerIsFlashing = footerIsFlashing;
      },
      error: (e) => console.error('error subscribeFooterIsFlashing', e)
    })
  }

  unsubscribeFooterIsFlashing(): void {
    if(this.footerIsFlashingSubscription) {
      this.footerIsFlashingSubscription.unsubscribe();
    }
  }

  showFooter(): void {
    this.vhsEffectService.showFooter();
  }

  hideFooter(): void {
    this.vhsEffectService.hideFooter();
  }

}
