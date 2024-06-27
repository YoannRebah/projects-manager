import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderHourglassComponent } from './components/base/loader-hourglass/loader-hourglass.component';
import { ModalUserAccountComponent } from './components/content/modal-user-account/modal-user-account.component';
import { ModalSettingsComponent } from './components/content/modal-settings/modal-settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LoaderHourglassComponent, 
    ModalUserAccountComponent, 
    ModalSettingsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor() {}

}