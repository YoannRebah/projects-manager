import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Introduction } from '../../../models/introduction';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})

export class IntroductionComponent {
  stringArray: Introduction[] = [
    {
      text: `Bienvenue sur mon portfolio directement inspiré des 80's&nbsp;!`,
    },
    {
      text: `Après avoir perfectionné mes compétences en HTML, SCSS et JavaScript, 
      j'ai franchi une nouvelle étape en adoptant Angular 17 pour ce projet.`,
    },
    {
      text: `Avec une identité visuelle distincte, chaque élément évoque l'énergie et le style rétro, 
      offrant une expérience immersive qui célèbre l'esthétique audacieuse et 
      vibrante des années 1980.`
    },
    {
      text: `Soyez curieux&nbsp;;) Survolez, cliquez... Bonne visite&nbsp;!`,
    },
  ];
}
