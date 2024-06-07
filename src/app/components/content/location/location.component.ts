import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../../../models/location';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})

export class LocationComponent {
  iconCheckClassNames = "fa-solid fa-check";
  iconUncheckClassNames = "fa-solid fa-xmark";
  locationList: Location[] = [
    {
      iconClassNames: this.iconCheckClassNames,
      key: "Pays",
      value: "France"
    },
    {
      iconClassNames: this.iconCheckClassNames,
      key: "Région",
      value: "Île-de-France"
    },
    {
      iconClassNames: this.iconCheckClassNames,
      key: "Département",
      value: "Essonne"
    },
    {
      iconClassNames: this.iconUncheckClassNames,
      key: "Ville",
      value: "[typed]"
    }
  ]
}
