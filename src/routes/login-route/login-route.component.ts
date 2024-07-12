import { Component } from '@angular/core';
import { LoginComponent } from '../../components/routes/login/login.component';

@Component({
  selector: 'app-login-route',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './login-route.component.html',
  styleUrl: './login-route.component.scss'
})

export class LoginRouteComponent {
  constructor() {}
}
