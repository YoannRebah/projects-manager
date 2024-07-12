import { Component, AfterViewInit, OnDestroy, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopinService } from './popin.service';

@Component({
  selector: 'app-popin',
  standalone: true,
  imports: [],
  templateUrl: './popin.component.html',
  styleUrl: './popin.component.scss'
})

export class PopinComponent implements AfterViewInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  isVisible: boolean = false;
  popinService = inject(PopinService);

  @Input() id!: string;
  @Input() position?: string = 'absolute';
  @Input() headerTitle?: string;
  @Input() text?: string;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.id) {
      this.subscribeIsVisible();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
  }

  subscribeIsVisible(): void {
    this.isVisibleSubscription = this.popinService.isVisible$(this.id!).subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
      error: (e) => console.error('error subscribeIsVisible', e)
    });
  }

  unsubscribeIsVisible(): void {
    if (this.isVisibleSubscription) {
      this.isVisibleSubscription.unsubscribe();
    }
  }

  hide(): void {
    if (this.id) {
      this.popinService.hide(this.id);
    }
  }

  onClickHide(): void {
    this.hide();
  }

}