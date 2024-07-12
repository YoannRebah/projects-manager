import { Component } from '@angular/core';
import { RegisterComponent } from '../../components/routes/register/register.component';

@Component({
  selector: 'app-register-route',
  standalone: true,
  imports: [
    RegisterComponent
  ],
  templateUrl: './register-route.component.html',
  styleUrl: './register-route.component.scss'
})

export class RegisterRouteComponent {
  constructor() {}
}
