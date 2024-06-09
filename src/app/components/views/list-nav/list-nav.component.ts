import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../../../shared/models/navigation';

@Component({
  selector: 'app-list-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss']
})

export class ListNavComponent {
  navLinks: Navigation[] = [
    {
      href: '#',
      iconClassNames: 'fa-solid fa-home',
      ariaLabel: 'Accueil',
      classNames: 'link-large',
    },
    {
      href: '#skills',
      iconClassNames: 'fa-solid fa-briefcase',
      html: 'Compétences',
      ariaLabel: 'Compétences',
    },
    {
      href: '#notable-achievements',
      iconClassNames: 'fa-solid fa-diagram-project',
      html: 'Réalisations',
      ariaLabel: 'Réalisations',
    },
    {
      href: '#contact',
      iconClassNames: 'fa-solid fa-phone',
      html: 'Contact',
      ariaLabel: 'Contact',
    },
    {
      href: 'https://github.com/YoannRebah/portfolio-angular',
      iconClassNames: 'fa-brands fa-github',
      target: '_blank',
      ariaLabel: 'Code source du portfolio',
      classNames: 'link-large',
      dataTitlePopin: 'Code source du portfolio',
    },
  ];
}
