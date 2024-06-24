import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';
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
  serviceId: string = environment.emailjs.serviceId; 
  templateId: string = environment.emailjs.templateId.contact;
  publicKey: string = environment.emailjs.publicKey;
  mailSendWithSuccess!: boolean;
  sendIsPending: boolean = false;
  templateParams = {};
  showLocationGif: boolean = false;
  formBuilder = inject(FormBuilder);
  windowRefService = inject(WindowRefService);
  popinService = inject(PopinService);

  constructor() { }

  ngOnInit(): void {
    this.initContactFormControl();
    this.subscribeCompagnyLocation();
  }

  initContactFormControl(): void {
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
  }

  subscribeCompagnyLocation(): void {
    this.contactForm.get('compagnyLocation')!.valueChanges.subscribe({
      next: (value) => {
        this.selectedLocation = value;
        if(this.selectedLocation === "37" || this.selectedLocation === "91") {
          this.showLocationGif = true;
        } else {
          this.showLocationGif = false;
        }
      },
      error: (e) => console.error('error subscribeCompagnyLocation', e)
    });
  }

  onSubmitContactForm(): void {
    if(!this.sendIsPending) {
      if (this.contactForm.invalid) {
        this.contactForm.markAllAsTouched();
        this.scrollToContactTop();
      } else {
        this.sendIsPending = true;
        this.completeTemplateParams();
        this.sendMail(this.templateParams);
      }
    }
  }

  scrollToContactTop(): void {
    const contactFormSectionId = this.windowRefService.windowRef.document.querySelector('#contact');
    if (contactFormSectionId) {
      contactFormSectionId.scrollIntoView({ behavior: 'smooth' });
    }
  }

  completeTemplateParams(): void {
    const contactFormData = this.contactForm.value;
    this.templateParams = {
      firstName: contactFormData.firstName,
      lastName: contactFormData.lastName,
      email: contactFormData.email,
      tel: contactFormData.tel,
      compagnyName: contactFormData.compagnyName,
      compagnyPost: contactFormData.compagnyPost,
      location: contactFormData.compagnyLocation,
      message: contactFormData.message
    };
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

  showPopinAfterSubmitForm(id: string) {
    this.popinService.show(id);
    this.sendIsPending = false;
  }

}
