import { Component } from '@angular/core';
import { ForgotPasswordComponent } from '../../components/routes/forgot-password/forgot-password.component';

@Component({
  selector: 'app-forgot-password-route',
  standalone: true,
  imports: [
    ForgotPasswordComponent
  ],
  templateUrl: './forgot-password-route.component.html',
  styleUrl: './forgot-password-route.component.scss'
})

export class ForgotPasswordRouteComponent {
  constructor() {}
}
