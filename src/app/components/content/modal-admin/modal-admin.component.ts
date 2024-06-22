import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../base/modal/modal.component';
import { ModalService } from '../../../shared/services/components/modal.service';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import cryptoRandomString from 'crypto-random-string';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';
import * as bcrypt from 'bcryptjs';

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
  passwordIsWrong: boolean = false;
  serviceId: string = environment.emailjs.serviceId; 
  templateId: string = environment.emailjs.templateId.code;
  publicKey: string = environment.emailjs.publicKey;
  cookieId: string = environment.admin.cookieId;
  showInputCode: boolean = false;
  adminPassword: string = environment.admin.password;
  code!: string;
  saltRounds: number = 10;

  @ViewChild('inputPasswordElementRef', { static: false }) inputPasswordElementRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputCodeElementRef', { static: false }) inputCodeElementRef!: ElementRef<HTMLInputElement>;

  constructor(
    private modalService: ModalService,
    private cookieService: CookieService
  ) {}

  onPressCtrlY(): void {
    if(!this.isVisible) {
      this.modalService.show(this.modalAdminId);
      this.isVisible = true;
      this.focusInputPassword();
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

  get randomCode(): string {
    const code = cryptoRandomString({ length: 6, type: 'numeric' });
    return code;
  }

  get cookieCode(): string {
    return this.cookieService.get(this.cookieId);
  }

  setCookieCode(value: string): void {
    const hashedValue = bcrypt.hashSync(value, this.saltRounds);
    this.cookieService.set(this.cookieId, hashedValue);
  }

  deleteCookieCode(): void {
    if(this.cookieCode) {
      this.cookieService.delete(this.cookieId);
    }
  }

  // input password
  focusInputPassword(): void {
    if(this.inputPasswordElementRef) {
      TimeoutService.setTimeout(()=>{
        this.inputPasswordElementRef.nativeElement.focus();
      }, 150);
    }
  }

  clearInputPassword(): void {
    if(this.inputPasswordElementRef) {
      this.inputPasswordElementRef.nativeElement.value = '';
    }
  }

  checkAdminPassword(Event: Event): void {
    const value = (Event.target as HTMLInputElement).value;
    if(value.length == this.adminPassword.length) {
      if(value == this.adminPassword) {
        this.passwordIsWrong = false;
        this.code = this.randomCode;
        this.setCookieCode(this.code);
        this.sendMail({code: this.code});
        this.clearInputPassword();
      } else {
        this.passwordIsWrong = true;
      }
    }
  }

  // input code
  focusInputCode(): void {
    if(this.inputCodeElementRef) {
      TimeoutService.setTimeout(()=>{
        this.inputCodeElementRef.nativeElement.focus();
      }, 150);
    }
  }

  clearInputCode(): void {
    if(this.inputCodeElementRef) {
      this.inputCodeElementRef.nativeElement.value = '';
    }
  }

  checkAdminCode(Event: Event): void {
    const value = (Event.target as HTMLInputElement).value;
    if(value) {
      const isMatch = bcrypt.compareSync(value, this.cookieCode);
      if(isMatch) {
        this.modalService.hide(this.modalAdminId);
        this.clearInputCode();
        this.deleteCookieCode();
        this.showInputCode = false;
        console.log("admin is connected");
      }
    }
  }

  sendMail(templateParams: {}): void {
    emailjs.send(this.serviceId, this.templateId, templateParams, { publicKey: this.publicKey})
    .then(() => {
        this.showInputCode = true;
        TimeoutService.setTimeout(()=>{
          this.focusInputCode();
        }, 150);
      },
      (e) => {
        console.error('error sendMail : ', e);
      }
    );
  }

}