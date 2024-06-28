import { Component } from '@angular/core';
import { Skills } from './skills.interface';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})

export class SkillsComponent {
  skills: Skills[] = [
    {
      textColor: 'text-orange',
      bgColor: 'bg-orange',
      bgColorDark: 'bg-orange-dark',
      language: 'HTML',
      iconClassName: 'fa-brands fa-html5',
      details: [
        {
          text: 'Structure & Sémantique',
          percent: 92,
        },
        {
          text: 'Attributs & Liens',
          percent: 84,
        },
        {
          text: 'Formulaires & Inputs',
          percent: 77,
        },
      ],
    },
    {
      textColor: 'text-pink',
      bgColor: 'bg-pink',
      bgColorDark: 'bg-pink-dark',
      language: 'SASS',
      iconClassName: 'fa-brands fa-sass',
      details: [
        {
          text: 'Syntaxe & Préprocesseur',
          percent: 80,
        },
        {
          text: 'Nesting & Partials',
          percent: 90,
        },
        {
          text: 'Mixins & Functions',
          percent: 85,
        },
      ],
    },
    {
      textColor: 'text-yellow',
      bgColor: 'bg-yellow',
      bgColorDark: 'bg-yellow-dark',
      language: 'JavaScript',
      iconClassName: 'fa-brands fa-js',
      details: [
        {
          text: 'Syntaxe & Bases',
          percent: 95,
        },
        {
          text: 'DOM & Événements',
          percent: 88,
        },
        {
          text: 'Asynchrone & Promesses',
          percent: 82,
        },
      ],
    },
    {
      textColor: 'text-red',
      bgColor: 'bg-red',
      bgColorDark: 'bg-red-dark',
      language: 'Angular',
      iconClassName: 'fa-brands fa-angular',
      details: [
        {
          text: 'Architecture & Composants',
          percent: 80,
        },
        {
          text: 'Services & DI',
          percent: 78,
        },
        {
          text: 'Routage & Navigation',
          percent: 88,
        },
      ],
    },
  ];
}
