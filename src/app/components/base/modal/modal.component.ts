import { Component, Input, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { ModalService } from '../../../shared/services/components/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class ModalComponent implements AfterViewInit, OnDestroy {
  private isVisibleSubscription!: Subscription;
  isVisible: boolean = false;
  modalService = inject(ModalService);

  @Input() id!: string;
  @Input() position?: string = 'fixed';
  @Input() flexAlign?: string = 'center';
  @Input() headerTitle?: string;

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
    this.isVisibleSubscription = this.modalService.isVisible$(this.id!).subscribe({
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
      this.modalService.hide(this.id);
    }
  }

  onClickHide(): void {
    this.hide();
  }

}