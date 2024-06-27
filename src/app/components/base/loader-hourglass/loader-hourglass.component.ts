import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderHourglassService } from '../../../shared/services/components/loader-hourglass.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader-hourglass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-hourglass.component.html',
  styleUrl: './loader-hourglass.component.scss'
})
export class LoaderHourglassComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  loaderHourglassService = inject(LoaderHourglassService);
  isVisibleSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.subscribeIsVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
  }

  subscribeIsVisible(): void {
    this.isVisibleSubscription = this.loaderHourglassService.isVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
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
