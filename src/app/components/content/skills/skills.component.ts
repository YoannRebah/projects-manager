import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skills } from '../../../models/skills';

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
          text: 'Structure',
          percent: 92,
        },
        {
          text: 'Accessibilité',
          percent: 84,
        },
        {
          text: 'SEO',
          percent: 77,
        },
        {
          text: 'Performances',
          percent: 99,
        },
        {
          text: 'Bonnes pratiques',
          percent: 87,
        },
      ],
    },
    {
      id: 'sass',
      language: 'SASS',
      iconClassName: 'fa-brands fa-sass',
      details: [
        {
          text: 'Syntaxe',
          percent: 80,
        },
        {
          text: 'Sélecteurs',
          percent: 90,
        },
        {
          text: 'Architecture',
          percent: 85,
        },
        {
          text: 'Performances',
          percent: 78,
        },
        {
          text: 'Bonnes pratiques',
          percent: 93,
        },
      ],
    },
    {
      id: 'js',
      language: 'JavaScript',
      iconClassName: 'fa-brands fa-js',
      details: [
        {
          text: 'Syntaxe de base',
          percent: 95,
        },
        {
          text: 'Fonctions',
          percent: 88,
        },
        {
          text: 'POO',
          percent: 82,
        },
        {
          text: 'Asynchronicité',
          percent: 76,
        },
        {
          text: 'Bonnes pratiques',
          percent: 97,
        },
      ],
    },
  ];
}
