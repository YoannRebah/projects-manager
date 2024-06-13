import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsFrService } from '../../../shared/services/locations-fr.service';
import { Region } from '../../../shared/models/locations-fr';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.scss'
})

export class FormContactComponent implements OnInit, OnDestroy {
  locationsFr: Region = LocationsFrService.locationsFr;
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initContactForm();
  }

  ngOnDestroy(): void {
      
  }

  initContactForm(): void {
    this.contactForm = this.formBuilder.group({
      "lastName": ['', Validators.required],
      "firstName": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "tel": ['', [Validators.required, Validators.pattern(UtilitiesService.regexValidateTelFr)]],
      "compagnyName": ['', Validators.required],
      "compagnyPost": [''],
      "compagnyLocation": [''],
      "message": ['']
    });
  }

  onSubmitContactForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    } else {
      console.log(this.contactForm.value);
    }
  }

}
