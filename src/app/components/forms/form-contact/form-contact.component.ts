import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { LocationsFrService } from '../../../shared/services/locations-fr.service';
import { Department, Region } from '../../../shared/models/locations-fr';

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.scss'
})

export class FormContactComponent implements OnInit, OnDestroy {
  locationsFr: Region = {};

  constructor(private locationsService: LocationsFrService) { }

  ngOnInit(): void {
    this.locationsFr = LocationsFrService.locationsFr;
  }

  ngOnDestroy(): void {
      
  }

}
