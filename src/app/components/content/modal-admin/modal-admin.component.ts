import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../base/modal/modal.component';
import { ModalService } from '../../../shared/services/components/modal.service';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modal-admin',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './modal-admin.component.html',
  styleUrl: './modal-admin.component.scss'
})

export class ModalAdminComponent {
  modalAdminId: string = 'modal-admin';
  isVisible: boolean = false;
  codeIsValid: boolean = false;
  serviceId: string = environment.emailjs.serviceId; 
  templateId: string = environment.emailjs.templateId;
  publicKey: string = environment.emailjs.publicKey;

  constructor(private modalService: ModalService) {}

  onPressCtrlY(): void {
    if(!this.isVisible) {
      this.modalService.show(this.modalAdminId);
      this.isVisible = true;
    } else {
      this.modalService.hide(this.modalAdminId);
      this.isVisible = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownTerminal(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'y') {
      this.onPressCtrlY();
    }
  }

  sendMail(templateParams: {}): void {
    emailjs.send(this.serviceId, this.templateId, templateParams, { publicKey: this.publicKey})
    .then(() => {
        
      },
      (error) => {
        
      }
    );
  }

}