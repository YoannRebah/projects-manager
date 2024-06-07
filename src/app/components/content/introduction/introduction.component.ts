import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Introduction } from '../../../models/introduction';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})

export class IntroductionComponent {
  stringArray: Introduction[] = [
    {
      text: `Bienvenue sur mon portfolio&nbsp;!`
    },
    {
      text: `Les défis de ce projet&nbsp;? Réaliser un site from scratch sans utiliser de framework,
      en intégrant Three.js et en créant des composants avec une identité visuelle bien marquée, dans une ambiance
      fortement teintée années 1980.`
    },
    {
      text: `Soyez curieux&nbsp;;) Survolez, cliquez... Bonne visite&nbsp;!` 
    }
  ]
}
