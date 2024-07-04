import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { VhsEffectService } from '../../../shared/services/components/vhs-effect.service';

@Component({
  selector: 'app-vhs-effect',
  standalone: true,
  imports: [],
  templateUrl: './vhs-effect.component.html',
  styleUrl: './vhs-effect.component.scss'
})

export class VhsEffectComponent implements OnInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  isVisible: boolean = true;
  vhsEffectService = inject(VhsEffectService);

  constructor() {}

  ngOnInit(): void {
    this.subscribeIsVisible()
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
  }

  // is visible
  subscribeIsVisible(): void {
    this.isVisibleSubscription = this.vhsEffectService.isVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
      error: (e) => console.error('error subscribeIsVisible', e)
    })
  }

  unsubscribeIsVisible(): void {
    if(this.isVisibleSubscription) {
      this.isVisibleSubscription.unsubscribe();
    }
  }

}