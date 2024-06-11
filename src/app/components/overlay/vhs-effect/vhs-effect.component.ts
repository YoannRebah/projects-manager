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
  isFlashing: boolean = false;
  timeoutDelay: number = 5000;
  footerIsVisible: boolean = true;
  private vhsEffectSubscription!: Subscription;

  constructor(
    private vhsEffectService: VhsEffectService
  ) {}

  ngOnInit(): void {
    this.startFlashAnimation();
    let timeout = setTimeout(()=>{
      this.stopFlashAnimation();
      clearTimeout(timeout);
    }, this.timeoutDelay);
    this.vhsEffectSubscription = this.vhsEffectService.footerIsVisible$.subscribe(footerIsVisible => {
      this.footerIsVisible = footerIsVisible;
    })
  }

  ngOnDestroy(): void {
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

  showFooter(): void {
    this.vhsEffectService.showFooter();
  }

  hideFooter(): void {
    this.vhsEffectService.hideFooter();
  }

}
