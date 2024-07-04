import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { VhsFooterService } from '../../../shared/services/components/vhs-footer.service';
import { VhsTimeCounterComponent } from '../vhs-time-counter/vhs-time-counter.component';
import { VhsTimeCounterService } from '../../../shared/services/components/vhs-time-counter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vhs-footer',
  standalone: true,
  imports: [VhsTimeCounterComponent],
  templateUrl: './vhs-footer.component.html',
  styleUrl: './vhs-footer.component.scss'
})

export class VhsFooterComponent implements OnInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  isVisible: boolean = false;
  vhsTimeCounterService = inject(VhsTimeCounterService);
  vhsFooterService = inject(VhsFooterService);

  constructor() {}

  ngOnInit(): void {
    this.subscribeIsVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
  }

  subscribeIsVisible(): void {
    this.isVisibleSubscription = this.vhsFooterService.isVisible$.subscribe({
      next:(isVisible) => {
        this.isVisible = isVisible;
        if(isVisible) {
          this.vhsTimeCounterService.show();
        }
      },
      error: (e) => console.error('error subscribeIsVisible : ', e)
    })
  }

  unsubscribeIsVisible(): void {
    if(this.isVisibleSubscription) {
      this.isVisibleSubscription.unsubscribe();
    }
  }

}