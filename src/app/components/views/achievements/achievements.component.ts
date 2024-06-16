import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnTab, Column } from '../../../shared/models/achievements';
import { PopinComponent } from '../../shared/popin/popin.component';
import { PopinService } from '../../../shared/services/components/popin.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, PopinComponent],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})

export class AchievementsComponent {
  activeIndex: number = 0;
  indexMin: number = 0;
  indexMax: number = 3;
  btnTabs: BtnTab[] = [
    { text: "BNP Paribas", index: 0 },
    { text: "Hello bank!", index: 1 },
    { text: "Hello bank! pro", index: 2 },
    { text: "Projets Perso", index: 3 },
  ];
  columns: Column[] = [
    {
      index: 0,
      img: {
        path: "assets/gif/achievements-1.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Missions :",
          list: [
            "Création de page / landing page",
            "Intégrations de mailing",
            "Gestion de contenu",
          ]
        },
        {
          title: "Environnement :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Logiciels & Outils :",
          list: [
            "VS Code",
            "Git",
            "Zeplin",
            "Jenkins"
          ]
        }
      ]
    },
    {
      index: 1,
      img: {
        path: "assets/gif/achievements-4.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Missions :",
          list: [
            "Création de page / landing page",
            "Gestion de contenu",
          ]
        },
        {
          title: "Lorem ipsum dolor 2 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Logiciels & Outils :",
          list: [
            "VS Code",
            "Git",
            "Zeplin",
            "Jenkins"
          ]
        }
      ]
    },
    {
      index: 2,
      img: {
        path: "assets/gif/achievements-3.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Missions :",
          list: [
            "Création de page / landing page",
            "Gestion de contenu",
          ]
        },
        {
          title: "Lorem ipsum dolor 3 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 3 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        }
      ]
    },
    {
      index: 3,
      img: {
        path: "assets/gif/achievements-5.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Création de sites :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Création de jeux vidéos :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Création de logiciel :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        }
      ]
    }
  ];

  constructor(private popinService: PopinService) {}

  setActive(index: number): void {
    this.activeIndex = index;
  }

  onClickPrev(): void {
    if(this.activeIndex > this.indexMin) {
      this.activeIndex--
    } else {
      this.activeIndex = this.indexMax
    }
  }

  onClickNext(): void {
    if(this.activeIndex < this.indexMax) {
      this.activeIndex++
    } else {
      this.activeIndex = this.indexMin
    }
  }

  showPopin(id: string): void {
    this.popinService.show(id);
  }

}