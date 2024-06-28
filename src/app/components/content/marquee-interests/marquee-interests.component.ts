import { Component } from '@angular/core';
import { Image } from '../../../shared/models/image.interface';

@Component({
  selector: 'app-marquee-interests',
  standalone: true,
  imports: [],
  templateUrl: './marquee-interests.component.html',
  styleUrl: './marquee-interests.component.scss'
})

export class MarqueeInterestsComponent {
  imgArray: Image[] = [
    {
      path: "../../assets/images/cinema.jpg",
      alt: "Cinéma"
    },
    {
      path: "../../assets/images/coding.jpg",
      alt: "Code"
    },
    {
      path: "../../assets/images/hiking.jpg",
      alt: "Randonnée"
    },
    {
      path: "../../assets/images/journey.jpg",
      alt: "Voyages"
    },
    {
      path: "../../assets/images/reading.jpg",
      alt: "Lecture"
    }
  ]
}