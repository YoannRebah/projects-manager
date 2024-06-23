import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})

export class IntroductionComponent {
  textArray: string[] = [
    `Bienvenue sur mon portfolio&nbsp;!`,
    `Après avoir perfectionné mes compétences en HTML, SCSS et JavaScript, j'ai franchi une nouvelle étape en adoptant Angular pour ce projet.`,
    `Avec une identité visuelle distincte, chaque élément évoque l'énergie et le style rétro, offrant une expérience immersive qui célèbre l'esthétique des années 1980 & 1990.`,
    `Survolez, cliquez... Bonne visite&nbsp;!`
  ];
}
