import { Component } from '@angular/core';
import { H1Component } from '../../components/base/h1/h1.component';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FormLoginComponent } from '../../components/content/form-login/form-login.component';

import { VhsEffectComponent } from '../../components/base/vhs-effect/vhs-effect.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    H1Component, 
    HeaderComponent,
    FormLoginComponent,
    VhsEffectComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

}
