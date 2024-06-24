import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// routes
import { HomepageComponent } from './routes/homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomepageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor() {}

}