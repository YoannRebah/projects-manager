import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anchor } from '../../../shared/models/anchor';

@Component({
  selector: 'app-list-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-footer.component.html',
  styleUrl: './list-footer.component.scss'
})

export class ListFooterComponent {
  footerLinks: Anchor[][] = [
    [
      {
        href: '#',
        text: "Accueil",
        ariaLabel: 'Accueil',
      },
      {
        href: '#intro',
        text: "Introduction",
        ariaLabel: 'Introduction',
      },
      {
        href: '#skills',
        text: "Compétences",
        ariaLabel: 'Compétences',
      },
      {
        href: '#notable-achievements',
        text: "Réalisations Notables",
        ariaLabel: 'Réalisations Notables',
      }
    ],
    [
      {
        href: '#tools-overview',
        text: "Logiciels",
        ariaLabel: 'Logiciels',
      },
      {
        href: '#current-job',
        text: "Poste Actuel",
        ariaLabel: 'Poste Actuel',
      },
      {
        href: '#location',
        text: 'Localisation',
        ariaLabel: 'Localisation',
      },
      {
        href: '#interests',
        text: "Centres d'intérêt",
        ariaLabel: 'Centres d\'intérêt',
      }
    ],
    [
      {
        href: '#arcade-room',
        text: "Salle d'Arcade",
        ariaLabel: 'Salle d\'Arcade',
      },
      {
        href: '#contact',
        text: "Contact",
        ariaLabel: 'Contact',
      },
      {
        href: '#blog',
        text: 'Articles du blog',
        ariaLabel: 'Articles du blog',
      },
      {
        href: 'https://github.com/YoannRebah/portfolio-angular',
        text: 'Code Source (Git)',
        ariaLabel: 'Code Source (Git)',
        target: "_blank"
      },
    ]
  ];
}