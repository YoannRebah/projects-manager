import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../shared/services/components/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class ModalComponent implements OnInit, OnDestroy {
  private isVisibleSubject!: Subscription;
  isVisible: boolean = false;

  constructor(
    private modalService: ModalService
  ) {}

  @Input() id: string = 'default-modal-id';
  @Input() position: string = 'fixed';
  @Input() titleText?: string;

  ngOnInit(): void {
    this.subscribeIsVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
  }

  subscribeIsVisible(): void {
    this.isVisibleSubject = this.modalService.isVisibleSubject$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
      error: (e) => console.error('error subscribeIsVisible', e)
    })
  }

  unsubscribeIsVisible(): void {
    if(this.isVisibleSubject) {
      this.isVisibleSubject.unsubscribe();
    }
  }

  hide(): void {
    this.modalService.hide();
  }

  onClickHide(): void {
    this.hide();
  }

}