import { Component } from '@angular/core';
import { Achievements } from '../../models/achievements';

@Component({
  selector: 'app-notable-achievements',
  templateUrl: './notable-achievements.component.html',
  styleUrl: './notable-achievements.component.scss'
})

export class NotableAchievementsComponent {
  achievements: Achievements[] = [
    {
      id: "hb",
      imagesPath: [
        {
          src: "../../assets/images/scotch-band-2.png",
          classNames: "scotch-band scotch-band_top-left",
          alt: "Scotch"
        },
        {
          src: "../assets/images/scotch-band-2.png",
          classNames: "scotch-band scotch-band_bottom-right",
          alt: "Scotch"
        }
      ],
      text: "Intégration de la homepage du site Hello bank!"
    },
    {
      id: "hb-pro",
      imagesPath: [
        {
          src: "../assets/images/scotch-band-1.png",
          classNames: "scotch-band scotch-band_top-right",
          alt: "Scotch"
        }
      ],
      text: "Intégration de la homepage du site Hello bank! pro"
    },
    {
      id: "open-street-map",
      imagesPath: [
        {
          src: "../assets/images/scotch-band-1.png",
          classNames: "scotch-band scotch-band_top-middle",
          alt: "Scotch"
        }
      ],
      text: "Développement d'un système de cartographie en temps réel"
    },
    {
      id: "bnp",
      imagesPath: [
        {
          src: "../assets/images/scotch-band-3.png",
          classNames: "scotch-band scotch-band_top-middle-horizontal",
          alt: "Scotch"
        }
      ],
      text: "Intégration de diverses page du site BNP Paribas"
    }
  ]
}
