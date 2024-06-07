import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interests } from '../../../models/interests';

@Component({
  selector: 'app-marquee-interests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee-interests.component.html',
  styleUrl: './marquee-interests.component.scss'
})

export class MarqueeInterestsComponent {
  interests: Interests[] = [
    {
      imagePath: "../../assets/images/cinema.jpg",
      imageAlt: "Cinéma"
    },
    {
      imagePath: "../../assets/images/coding.jpg",
      imageAlt: "Code"
    },
    {
      imagePath: "../../assets/images/hiking.jpg",
      imageAlt: "Randonnée"
    },
    {
      imagePath: "../../assets/images/journey.jpg",
      imageAlt: "Voyages"
    },
    {
      imagePath: "../../assets/images/reading.jpg",
      imageAlt: "Lecture"
    }
  ]
}
