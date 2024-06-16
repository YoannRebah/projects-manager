import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Introduction } from '../../../shared/models/introduction';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})

export class IntroductionComponent {
  stringArray: Introduction[] = [
    {
      text: `Bienvenue sur mon portfolio&nbsp;!`,
    },
    {
      text: `Après avoir perfectionné mes compétences en HTML, SCSS et JavaScript, 
      j'ai franchi une nouvelle étape en adoptant Angular 17 pour ce projet.`,
    },
    {
      text: `Avec une identité visuelle distincte, chaque élément évoque l'énergie et le style rétro, 
      offrant une expérience immersive qui célèbre l'esthétique des années 1980 - 1990.`
    },
    {
      text: `Survolez, cliquez... Bonne visite&nbsp;!`,
    },
  ];
}
