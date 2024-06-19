import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { VhsEffectService } from '../../../shared/services/components/vhs-effect.service';
import { Subscription } from 'rxjs';
import { ToggleSwitchComponent } from '../../shared/toggle-switch/toggle-switch.component';
import { ToggleSwitchService } from '../../../shared/services/components/toggle-switch.service';

@Component({
  selector: 'app-modal-settings',
  standalone: true,
  imports: [CommonModule, ModalComponent, ToggleSwitchComponent],
  templateUrl: './modal-settings.component.html',
  styleUrl: './modal-settings.component.scss'
})

export class ModalSettingsComponent implements OnInit, OnDestroy {
  private vhsEffectIsVisibleSubscription!: Subscription;
  vhsEffectIsVisible!: boolean;
  private footerVhsEffectIsVisibleSubscription!: Subscription;
  footerIsVisible!: boolean;

  constructor(
    private vhsEffectService: VhsEffectService,
    private toggleSwitchService: ToggleSwitchService
  ) {}

  ngOnInit(): void {
    // this.subscribeVhsEffectIsVisible();
    // this.subscribeFooterIsVisible();
  }

  ngOnDestroy(): void {
    // this.unsubscribeVhsEffectIsVisible();
    // this.unsubscribeFooterIsVisible();
  }

  test(): void {
    console.log(document.querySelector('#checkbox-toggle-vhs-effect')?.getAttribute('checked'))
  }

  // vhs effect is visible
  subscribeVhsEffectIsVisible(): void {
    this.vhsEffectIsVisibleSubscription = this.vhsEffectService.isVisible$.subscribe({
      next: (isVisible) => {
        this.vhsEffectIsVisible = isVisible;
      },
      error: (e) => console.error('error subscribeVhsEffectIsVisible', e)
    })
  }

  unsubscribeVhsEffectIsVisible(): void {
    if(this.vhsEffectIsVisibleSubscription) {
      this.vhsEffectIsVisibleSubscription.unsubscribe();
    }
  }

  // footer vhs effect is visible
  subscribeFooterIsVisible(): void {
    this.footerVhsEffectIsVisibleSubscription = this.vhsEffectService.footerIsVisible$.subscribe({
      next: (footerIsVisible) => {
        this.footerIsVisible = footerIsVisible;
      },
      error: (e) => console.error('error subscribeFooterIsVisible', e)
    })
  }

  unsubscribeFooterIsVisible(): void {
    if(this.footerVhsEffectIsVisibleSubscription) {
      this.footerVhsEffectIsVisibleSubscription.unsubscribe();
    }
  }

}