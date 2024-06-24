import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anchor } from '../../../shared/models/anchor';
import { Button } from '../../../shared/models/button';
import { ModalSettingsComponent } from '../modal-settings/modal-settings.component';
import { ModalService } from '../../../shared/services/components/modal.service';
import { AuthService } from '../../../shared/services/base/auth.service';

@Component({
  selector: 'app-list-nav',
  standalone: true,
  imports: [CommonModule, ModalSettingsComponent],
  templateUrl: './list-nav.component.html',
  styleUrl: './list-nav.component.scss'
})

export class ListNavComponent implements OnInit{
  navAnchors: Anchor[] = [
    {
      href: '#',
      classNames: 'text-base',
      iconClassNames: 'fa-solid fa-home',
      ariaLabel: 'Accueil',
      tooltip: 'Accueil',
    },
    {
      href: '#skills',
      classNames: 'text-sm',
      iconClassNames: 'fa-solid fa-briefcase',
      text: 'Compétences',
      ariaLabel: 'Compétences',
    },
    {
      href: '#notable-achievements',
      classNames: 'text-sm',
      iconClassNames: 'fa-solid fa-diagram-project',
      text: 'Réalisations',
      ariaLabel: 'Réalisations',
    },
    {
      href: '#contact',
      classNames: 'text-sm',
      iconClassNames: 'fa-solid fa-phone',
      text: 'Contact',
      ariaLabel: 'Contact',
    },
    {
      href: 'https://github.com/YoannRebah/portfolio-angular',
      classNames: 'text-sm',
      iconClassNames: 'fa-brands fa-github',
      text: 'Git',
      target: '_blank',
      ariaLabel: 'Code source',
      tooltip: 'Code source',
    },
  ];
  navButtons: Button[] = [
    {
      classNames: 'text-sm',
      iconClassNames: 'fa-solid fa-gear',
      text: 'Paramètres',
      ariaLabel: 'Paramètres',
      onClick: this.onClickShowSettings.bind(this)
    }
  ];
  modalService = inject(ModalService);
  authService = inject(AuthService);
  userLoggedIn: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.checkUserConnectionStatus();
  }

  onClickShowSettings(): void {
    this.modalService.show('modal-settings');
  }

  checkUserConnectionStatus(): void {
    this.authService.user$.subscribe((user: { email: string; displayName: string; }) => {
      if(user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          username: user.displayName!
        });
        this.userLoggedIn = true;
      } else {
        this.authService.currentUserSignal.set(null);
        this.userLoggedIn = false;
      }
    });
  }

  onClickLogout(): void {
    this.authService.logout();
  }

}