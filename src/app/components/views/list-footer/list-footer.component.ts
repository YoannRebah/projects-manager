import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anchor } from '../../../shared/models/common/anchor';

@Component({
  selector: 'app-list-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-footer.component.html',
  styleUrls: ['./list-footer.component.scss']
})
export class ListFooterComponent {
  footerLinks: Anchor[] = [
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
      href: '#tools-overview',
      text: "Logiciels",
      ariaLabel: 'Logiciels',
    },
    {
      href: '#notable-achievements',
      text: "Réalisations Notables",
      ariaLabel: 'Réalisations Notables',
    },
    {
      href: '#current-job',
      text: "Poste Actuel",
      ariaLabel: 'Poste Actuel',
    },
    {
      href: '#interests',
      text: "Centres d'intérêt",
      ariaLabel: 'Centres d\'intérêt',
    },
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
      href: '#location',
      text: 'Localisation',
      ariaLabel: 'Localisation',
    },
    {
      href: '#references',
      text: 'Références & Inspirations',
      ariaLabel: 'Références & Inspirations',
    },
    {
      href: 'https://github.com/YoannRebah/portfolio-angular',
      text: 'Code Source (Git)',
      ariaLabel: 'Code Source (Git)',
      target: "_blank"
    },
  ];
}
