import { Component } from '@angular/core';
import { Navigation } from '../../models/navigation';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  
  navLinks: Navigation[] = [
    {
      href: '#skills',
      iconClassNames: 'fa-solid fa-briefcase',
      html: 'Compétences',
      target: null,
      ariaLabel: 'Compétences',
      classNames: null,
      dataTitlePopin: null,
    },
    {
      href: '#notable-achievements',
      iconClassNames: 'fa-solid fa-diagram-project',
      html: 'Réalisations',
      target: null,
      ariaLabel: 'Réalisations',
      classNames: null,
      dataTitlePopin: null,
    },
    {
      href: '#contact',
      iconClassNames: 'fa-solid fa-phone',
      html: 'Contact',
      target: null,
      ariaLabel: 'Contact',
      classNames: null,
      dataTitlePopin: null,
    },
    {
      href: 'https://github.com/YoannRebah/portfolio',
      iconClassNames: 'fa-brands fa-github',
      html: null,
      target: '_blank',
      ariaLabel: 'Code source du portfolio',
      classNames: 'large',
      dataTitlePopin: 'Code source du portfolio',
    },
  ];

}
