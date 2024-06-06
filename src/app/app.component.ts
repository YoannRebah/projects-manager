import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayModule } from '../app/modules/overlay/overlay.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { TextModule } from './modules/text/text.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OverlayModule,
    NavigationModule,
    TextModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
