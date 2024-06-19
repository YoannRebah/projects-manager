import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { VhsEffectService } from '../../../shared/services/components/vhs-effect.service';
import { Subscription } from 'rxjs';
import { ToggleSwitchService } from '../../../shared/services/components/toggle-switch.service';
import { ToggleSwitchComponent } from '../../shared/toggle-switch/toggle-switch.component';

@Component({
  selector: 'app-modal-settings',
  standalone: true,
  imports: [CommonModule, ModalComponent, ToggleSwitchComponent],
  templateUrl: './modal-settings.component.html',
  styleUrl: './modal-settings.component.scss'
})

export class ModalSettingsComponent implements OnInit, OnDestroy {
  private vhsEffectIsVisibleSubscription!: Subscription;
  private footerVhsEffectIsVisibleSubscription!: Subscription;
  vhsEffectIsVisible!: boolean;
  footerIsVisible!: boolean;

  constructor(
    private vhsEffectService: VhsEffectService,
    private toggleSwitchService: ToggleSwitchService
  ) {}

  ngOnInit(): void {
    this.subscribeVhsEffectIsVisible();
    this.subscribeFooterIsVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribeVhsEffectIsVisible();
    this.unsubscribeFooterIsVisible();
  }

  // vhs effect is visible
  subscribeVhsEffectIsVisible(): void {
    this.vhsEffectIsVisibleSubscription = this.vhsEffectService.isVisible$.subscribe({
      next: (isVisible) => {
        this.vhsEffectIsVisible = isVisible;
        if(this.vhsEffectIsVisible) {
          this.vhsEffectService.showFooter();
          this.toggleSwitchService.check();
        } else {
          this.vhsEffectService.hideFooter();
          this.toggleSwitchService.uncheck();
        }
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

  // onChangeVhsEffect(Event: Event): void {
  //   const inputElement = (Event.target as HTMLInputElement);
  //   if(inputElement.checked) {
  //     this.vhsEffectService.show();
  //     this.vhsEffectService.showFooter();
  //   } else {
  //     this.vhsEffectService.hide();
  //     this.vhsEffectService.hideFooter();
  //   }
  // }

  toggleVhsEffect(): void {
    if(this.toggleSwitchService.getCurrentState()) {
      this.vhsEffectService.show();
      this.vhsEffectService.showFooter();
    } else {
      this.vhsEffectService.hide();
      this.vhsEffectService.hideFooter();
    }
  }

}