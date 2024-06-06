import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OverlayModule } from '../app/modules/overlay/overlay.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { TextModule } from './modules/text/text.module';
import { LayoutModule } from './modules/layout/layout.module';
import { ContentModule } from './modules/content/content.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    OverlayModule,
    NavigationModule,
    TextModule,
    LayoutModule,
    ContentModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
