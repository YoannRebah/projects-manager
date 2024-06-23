import { Component } from '@angular/core';
import { MainComponent } from '../../../components/layout/main/main.component';
import { VhsEffectComponent } from '../../../components/base/vhs-effect/vhs-effect.component';
import { ModalAdminComponent } from '../../../components/content/modal-admin/modal-admin.component';
import { ContentComponent } from '../../../components/layout/content/content.component';

@Component({
  selector: 'app-template-login',
  standalone: true,
  imports: [
    MainComponent,
    VhsEffectComponent,
    ModalAdminComponent,
    ContentComponent
  ],
  templateUrl: './template-login.component.html',
  styleUrl: './template-login.component.scss'
})

export class TemplateLoginComponent {

}
