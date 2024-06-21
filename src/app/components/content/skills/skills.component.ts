import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skills } from './skills';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})

export class SkillsComponent {
  skills: Skills[] = [
    {
      id: 'html',
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
      id: 'sass',
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
      id: 'js',
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
      id: 'angular',
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
