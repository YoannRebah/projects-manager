import { Component } from '@angular/core';
import { PageNotFoundComponent } from '../../components/routes/page-not-found/page-not-found.component';

@Component({
  selector: 'app-page-not-found-route',
  standalone: true,
  imports: [
    PageNotFoundComponent
  ],
  templateUrl: './page-not-found-route.component.html',
  styleUrl: './page-not-found-route.component.scss'
})

export class PageNotFoundRouteComponent {
  constructor() {}
}
