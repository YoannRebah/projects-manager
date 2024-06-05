import { Component } from '@angular/core';
import { Nav } from '../../models/nav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  
  navLinks: Nav[] = [
    {
      href: '#skills',
      html: 'Compétences',
      target: '',
      ariaLabel: 'Compétences',
      classNames: '',
      dataTitlePopin: '',
      iconClassNames: 'fa-solid fa-briefcase',
    },
    {
      href: '#notable-achievements',
      html: 'Réalisations',
      target: '',
      ariaLabel: 'Réalisations',
      classNames: '',
      dataTitlePopin: '',
      iconClassNames: 'fa-solid fa-diagram-project',
    },
    {
      href: '#contact',
      html: 'Contact',
      target: '',
      ariaLabel: 'Contact',
      classNames: '',
      dataTitlePopin: '',
      iconClassNames: ''
    },
    {
      href: 'https://github.com/YoannRebah/portfolio',
      html: '',
      target: '_blank',
      ariaLabel: 'Code source du portfolio',
      classNames: 'large',
      dataTitlePopin: 'Code source du portfolio',
      iconClassNames: 'fa-brands fa-github',
    },
  ];

}
