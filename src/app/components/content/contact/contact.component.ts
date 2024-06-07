import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent {
  mailPro: string = "y.rebah.pro@gmail.com";
  contactLinks: Contact[] = [
    {
      href: "mailto:" + this.mailPro,
      target: null,
      ariaLabel: "Envoyer un mail",
      iconClassNames: "fa-regular fa-envelope",
      text: this.mailPro
    },
    {
      href: "https://www.geek-directeur-technique.com/2012/07/06/le-minitel-est-mort",
      target: "_blank",
      ariaLabel: "Via Minitel",
      iconClassNames: "fa-solid fa-laptop",
      text: "3615 YREBAH (HS)"
    }
  ]
}
