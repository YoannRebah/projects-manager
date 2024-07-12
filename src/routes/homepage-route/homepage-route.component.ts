import { Component } from '@angular/core';
import { HomepageComponent } from '../../components/routes/homepage/homepage.component';

@Component({
  selector: 'app-homepage-route',
  standalone: true,
  imports: [
    HomepageComponent
  ],
  templateUrl: './homepage-route.component.html',
  styleUrl: './homepage-route.component.scss'
})

export class HomepageRouteComponent {
  constructor() {}
}