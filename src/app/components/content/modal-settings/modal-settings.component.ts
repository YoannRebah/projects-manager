import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../base/modal/modal.component';
import { VhsEffectService } from '../../../shared/services/components/vhs-effect.service';
import { Subscription } from 'rxjs';
import { ToggleSwitchComponent } from '../../base/toggle-switch/toggle-switch.component';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';

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
  vhsEffectIsVisible: boolean = true;
  footerIsVisible: boolean = true;
  toggleSwitchVhsEffectId: string = 'toggle-vhs-effect';

  @ViewChild('toggleSwitchVhsEffect') toggleSwitchVhsEffect!: ToggleSwitchComponent;

  constructor(private vhsEffectService: VhsEffectService) {}

  ngOnInit(): void {
    this.subscribeVhsEffectIsVisible();
    this.subscribeFooterIsVisible();
    TimeoutService.setTimeout(()=>{
      this.setToggleSwitchVhsEffectState(this.vhsEffectIsVisible);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeVhsEffectIsVisible();
    this.unsubscribeFooterIsVisible();
  }

  // Subscribe methods
  subscribeVhsEffectIsVisible(): void {
    this.vhsEffectIsVisibleSubscription = this.vhsEffectService.isVisible$.subscribe({
      next: (isVisible) => {
        this.vhsEffectIsVisible = isVisible;
        this.toggleVhsEffect();
      },
      error: (e) => console.error('error subscribeVhsEffectIsVisible', e)
    });
  }

  unsubscribeVhsEffectIsVisible(): void {
    if (this.vhsEffectIsVisibleSubscription) {
      this.vhsEffectIsVisibleSubscription.unsubscribe();
    }
  }

  subscribeFooterIsVisible(): void {
    this.footerVhsEffectIsVisibleSubscription = this.vhsEffectService.footerIsVisible$.subscribe({
      next: (footerIsVisible) => {
        this.footerIsVisible = footerIsVisible;
      },
      error: (e) => console.error('error subscribeFooterIsVisible', e)
    });
  }

  unsubscribeFooterIsVisible(): void {
    if (this.footerVhsEffectIsVisibleSubscription) {
      this.footerVhsEffectIsVisibleSubscription.unsubscribe();
    }
  }

  // toggle switch components
  onStateChanged(newState: boolean, id: string): void {
    if(id === this.toggleSwitchVhsEffectId) {
      if(newState) {
        this.vhsEffectService.show();
        this.vhsEffectService.showFooter();
      } else {
        this.vhsEffectService.hide();
        this.vhsEffectService.hideFooter();
      }
    }
  }

  setToggleSwitchVhsEffectState(newState: boolean): void {
    if (this.toggleSwitchVhsEffect) {
      this.toggleSwitchVhsEffect.checkboxState = newState;
    }
  }

  toggleVhsEffect() {
    if(this.vhsEffectIsVisible) {
      this.setToggleSwitchVhsEffectState(true);
    } else {
      this.setToggleSwitchVhsEffectState(false);
    }
  }

}