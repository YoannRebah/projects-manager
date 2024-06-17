import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PopinService } from '../../../shared/services/components/popin.service';

@Component({
  selector: 'app-popin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popin.component.html',
  styleUrl: './popin.component.scss'
})

export class PopinComponent implements AfterViewInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  isVisible: boolean = false;

  @Input() id: string = 'popin-default-id';
  @Input() position?: string = 'absolute';
  @Input() img?: string; // error | success | mail | help
  @Input() titleText?: string;
  @Input() contentText?: string;

  constructor(
    private popinService: PopinService
  ) {}

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