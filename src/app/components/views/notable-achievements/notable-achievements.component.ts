import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Achievements } from '../../../shared/models/achievements';

@Component({
  selector: 'app-notable-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notable-achievements.component.html',
  styleUrls: ['./notable-achievements.component.scss']
})

export class NotableAchievementsComponent {
  achievements: Achievements[] = [
    {
      id: "hb",
      imagesPath: {
        src: "../../assets/images/scotch-band-1.png",
        classNames: "scotch-band_top-left"
      },
      text: "Intégration de la homepage du site Hello bank!"
    },
    {
      id: "hb-pro",
      imagesPath: {
        src: "../assets/images/scotch-band-1.png",
        classNames: "scotch-band_top-right"
      },
      text: "Intégration de la homepage du site Hello bank! pro"
    },
    {
      id: "open-street-map",
      imagesPath: {
        src: "../assets/images/scotch-band-1.png",
        classNames: "scotch-band_top-middle"
      },
      text: "Développement d'un système de cartographie en temps réel"
    },
    {
      id: "bnp",
      imagesPath: {
        src: "../assets/images/scotch-band-1.png",
        classNames: "scotch-band_top-middle-horizontal"
      },
      text: "Intégration de diverses page du site BNP Paribas"
    }
  ]
}