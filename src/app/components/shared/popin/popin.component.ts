import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopinService } from '../../../shared/services/components/popin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popin.component.html',
  styleUrl: './popin.component.scss'
})
export class PopinComponent implements OnInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  isVisible: boolean = false;

  @Input() id?: string;
  @Input() isError?: string;
  @Input() formSentSuccess?: string;
  @Input() titleText?: string;
  @Input() contentText?: string;

  constructor(private popinService: PopinService) {}

  ngOnInit(): void {
    this.subscribeIsVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
  }

  subscribeIsVisible(): void {
    this.isVisibleSubscription = this.popinService.isVisible$.subscribe({
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

  show(): void {
    this.popinService.show();
  }

  hide(): void {
    this.popinService.hide();
  }

  onClickHide(): void {
    this.hide();
  }
}
