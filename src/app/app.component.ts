import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayModule } from '../app/modules/overlay/overlay.module';
import { MenuModule } from '../app/modules/menu/menu.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OverlayModule,
    MenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
