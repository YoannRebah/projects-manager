import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anchor } from '../../../shared/models/common/anchor';

@Component({
  selector: 'app-list-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss']
})

export class ListNavComponent {
  navLinks: Anchor[] = [
    {
      href: '#',
      iconClassNames: 'fa-solid fa-home',
      ariaLabel: 'Accueil',
      classNames: 'link-large',
      tooltip: 'Accueil',
    },
    {
      href: '#skills',
      iconClassNames: 'fa-solid fa-briefcase',
      text: 'Compétences',
      ariaLabel: 'Compétences',
    },
    {
      href: '#notable-achievements',
      iconClassNames: 'fa-solid fa-diagram-project',
      text: 'Réalisations',
      ariaLabel: 'Réalisations',
    },
    {
      href: '#contact',
      iconClassNames: 'fa-solid fa-phone',
      text: 'Contact',
      ariaLabel: 'Contact',
    },
    {
      href: 'https://github.com/YoannRebah/portfolio-angular',
      iconClassNames: 'fa-brands fa-github',
      target: '_blank',
      ariaLabel: 'Code source du portfolio',
      classNames: 'link-large',
      tooltip: 'Code source du portfolio',
    },
  ];
}
