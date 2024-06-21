import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anchor } from '../../../shared/models/anchor';
import { Button } from '../../../shared/models/button';
import { ModalSettingsComponent } from '../modal-settings/modal-settings.component';
import { ModalService } from '../../../shared/services/components/modal.service';

@Component({
  selector: 'app-list-nav',
  standalone: true,
  imports: [CommonModule, ModalSettingsComponent],
  templateUrl: './list-nav.component.html',
  styleUrls: ['./list-nav.component.scss']
})

export class ListNavComponent {
  navAnchors: Anchor[] = [
    {
      href: '#',
      iconClassNames: 'fa-solid fa-home',
      ariaLabel: 'Accueil',
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
      tooltip: 'Code source du portfolio',
    },
  ];
  navButtons: Button[] = [
    {
      iconClassNames: 'fa-solid fa-gear',
      ariaLabel: 'Paramètres',
      tooltip: 'Paramètres',
      onClick: this.onClickShowSettings.bind(this)
    }
  ];

  constructor(
    private modalService: ModalService
  ) {}

  onClickShowSettings(): void {
    this.modalService.show();
  }

}