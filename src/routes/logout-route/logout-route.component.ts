import { Component } from '@angular/core';
import { LogoutComponent } from '../../components/routes/logout/logout.component';

@Component({
  selector: 'app-logout-route',
  standalone: true,
  imports: [
    LogoutComponent
  ],
  templateUrl: './logout-route.component.html',
  styleUrl: './logout-route.component.scss'
})

export class LogoutRouteComponent {
  constructor() {}
}
