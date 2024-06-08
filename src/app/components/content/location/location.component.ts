import { Component, ElementRef, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../../../models/location';
import Typed from 'typed.js';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit, AfterViewInit {
  iconCheckClassNames = "fa-solid fa-check";
  iconUncheckClassNames = "fa-solid fa-xmark";
  typedStringArray: string[] = ["????", "Failed to retrieve data", "NETWORK_FAILED", "ERROR_6005", "Cannot retrieve data"]; 
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
      value: "[typed]",
      tempRefVar: "typedElement"
    }
  ];

  @ViewChildren('typedElement') typedElements!: QueryList<ElementRef>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') { // Vérification si le document est défini
      this.typedElements.forEach((element, index) => {
        new Typed(
          element.nativeElement,
          {
            strings: this.typedStringArray,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            cursorChar: '<i class="fa-solid fa-square"></i>',
            loop: true
          }
        );
      });
    }
  }
}
