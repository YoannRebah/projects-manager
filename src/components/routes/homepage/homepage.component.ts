import { Component } from '@angular/core';
import { DashboardComponent } from '../../layout/dashboard/dashboard.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    DashboardComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {
  constructor() {}
}