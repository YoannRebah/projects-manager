import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { ModalComponent } from '../../base/modal/modal.component';
import { VhsEffectService } from '../../../shared/services/components/vhs-effect.service';
import { VhsFooterService } from '../../../shared/services/components/vhs-footer.service';
import { Subscription } from 'rxjs';
import { ToggleSwitchComponent } from '../../base/toggle-switch/toggle-switch.component';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';
import { VhsTimeCounterService } from '../../../shared/services/components/vhs-time-counter.service';

@Component({
  selector: 'app-modal-settings',
  standalone: true,
  imports: [ModalComponent, ToggleSwitchComponent],
  templateUrl: './modal-settings.component.html',
  styleUrl: './modal-settings.component.scss'
})

export class ModalSettingsComponent implements OnInit, OnDestroy {
  private vhsEffectIsVisibleSubscription!: Subscription;
  vhsEffectIsVisible: boolean = true;
  footerIsVisible: boolean = true;
  toggleSwitchVhsEffectId: string = 'toggle-vhs-effect';
  vhsEffectService = inject(VhsEffectService);
  vhsFooterService = inject(VhsFooterService);
  vhsTimeCounterService = inject(VhsTimeCounterService);

  @ViewChild('toggleSwitchVhsEffect') toggleSwitchVhsEffect!: ToggleSwitchComponent;

  constructor() {}

  ngOnInit(): void {
    this.subscribeVhsEffectIsVisible();
    TimeoutService.setTimeout(()=>{
      this.setToggleSwitchVhsEffectState(this.vhsEffectIsVisible);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeVhsEffectIsVisible();
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

  // toggle switch components
  onStateChanged(newState: boolean, id: string): void {
    if(id === this.toggleSwitchVhsEffectId) {
      if(newState) {
        this.vhsEffectService.show();
        this.vhsFooterService.show();
        this.vhsTimeCounterService.start();
      } else {
        this.vhsEffectService.hide();
        this.vhsFooterService.hide();
        this.vhsTimeCounterService.stop();
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