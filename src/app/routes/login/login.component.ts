import { Component } from '@angular/core';
import { H1Component } from '../../components/base/h1/h1.component';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { LoginContentComponent } from '../../components/content/login-content/login-content.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    H1Component, 
    HeaderComponent,
    LoginContentComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor() {}
}
