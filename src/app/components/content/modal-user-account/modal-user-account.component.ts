import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../base/modal/modal.component';
import { ModalService } from '../../../shared/services/components/modal.service';
import { AuthService } from '../../../shared/services/base/auth.service';

@Component({
  selector: 'app-modal-user-account',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './modal-user-account.component.html',
  styleUrl: './modal-user-account.component.scss'
})
export class ModalUserAccountComponent {
  isVisible: boolean = false;
  modalId: string = 'modal-user-account';
  modalService = inject(ModalService);
  authService = inject(AuthService);

  constructor() {}

  onPressKeyCtrlY(): void {
    this.isVisible = !this.isVisible;
    if(this.isVisible) {
      this.modalService.show(this.modalId);
    } else {
      this.modalService.hide(this.modalId);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownTerminal(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'y') {
      event.preventDefault();
      this.onPressKeyCtrlY();
    }
  }

  onClickLogout(): void {
    this.authService.logout();
    this.modalService.hide(this.modalId);
  }
}
