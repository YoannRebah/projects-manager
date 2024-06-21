import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsFrService } from '../../../shared/services/components/locations-fr.service';
import { Region } from './locations-fr';
import { ValidatorsService } from '../../../shared/services/utilities/validators.service';
import { WindowRefService } from '../../../shared/services/utilities/window-ref.service';
import { PopinComponent } from '../../base/popin/popin.component';
import { PopinService } from '../../../shared/services/components/popin.service';

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PopinComponent],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.scss'
})

export class FormContactComponent implements OnInit {
  locationsFr: Region = LocationsFrService.locationsFr;
  selectedLocation!: string;
  contactForm!: FormGroup;
  serviceId: string = 'service_5ru7fw9';
  templateId: string = 'template_d02jila';
  publicKey: string = 'nAi6Eim9qL5XMDKyr';
  mailSendWithSuccess!: boolean;
  sendIsPending: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private windowRefService: WindowRefService,
    private popinService: PopinService
  ) { }

  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm(): void {
    this.contactForm = this.formBuilder.group({
      "lastName": ['', Validators.required],
      "firstName": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "tel": ['', [Validators.required, Validators.pattern(ValidatorsService.regexValidateTelFr)]],
      "compagnyName": ['', Validators.required],
      "compagnyPost": [''],
      "compagnyLocation": [''],
      "message": ['']
    });
    this.subscribeCompagnyLocation();
  }

  onSubmitContactForm(): void {
    if(!this.sendIsPending) {
      if (this.contactForm.invalid) {
        this.contactForm.markAllAsTouched();
        const contactFormSectionId = this.windowRefService.windowRef.document.querySelector('#contact');
        if (contactFormSectionId) contactFormSectionId.scrollIntoView({ behavior: 'smooth' });
        return;
      } else {
        this.sendIsPending = true;
        const contactFormData = this.contactForm.value;
        const templateParams = {
          firstName: contactFormData.firstName,
          lastName: contactFormData.lastName,
          email: contactFormData.email,
          tel: contactFormData.tel,
          compagnyName: contactFormData.compagnyName,
          compagnyPost: contactFormData.compagnyPost,
          location: contactFormData.compagnyLocation,
          message: contactFormData.message
        };
        this.sendMail(templateParams);
      }
    }
  }

  sendMail(templateParams: {}): void {
    emailjs.send(this.serviceId, this.templateId, templateParams, { publicKey: this.publicKey})
    .then(() => {
        this.mailSendWithSuccess = true;
        this.contactForm.reset();
        this.showPopinAfterSubmitForm('popin-form-sent-success');
      },
      (error) => {
        this.mailSendWithSuccess = false;
        this.showPopinAfterSubmitForm('popin-form-sent-error');
      }
    );
  }

  subscribeCompagnyLocation(): void {
    this.contactForm.get('compagnyLocation')!.valueChanges.subscribe((value) => {
      this.selectedLocation = value;
      this.isGoodChoice();
    });
  }

  isGoodChoice(): boolean {
    return this.selectedLocation === "37" || this.selectedLocation === "91";
  }

  showPopinAfterSubmitForm(id: string) {
    this.popinService.show(id);
    this.sendIsPending = false;
  }

}
