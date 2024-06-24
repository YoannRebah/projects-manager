import { Component } from '@angular/core';
import { H1Component } from '../../components/base/h1/h1.component';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FormRegisterComponent } from '../../components/content/form-register/form-register.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    H1Component, 
    HeaderComponent,
    FormRegisterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

}
