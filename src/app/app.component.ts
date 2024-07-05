import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// base
import { LoaderComponent } from './components/base/loader/loader.component';
import { LoaderHourglassComponent } from './components/base/loader-hourglass/loader-hourglass.component';
// layout
import { MainComponent } from './components/layout/main/main.component';
import { ContentComponent } from './components/layout/content/content.component';
import { NavComponent } from './components/layout/nav/nav.component';
// content
import { VhsEffectComponent } from './components/content/vhs-effect/vhs-effect.component';
import { VhsFooterComponent } from './components/content/vhs-footer/vhs-footer.component';
import { NavContentComponent } from './components/content/nav-content/nav-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LoaderHourglassComponent, 
    LoaderComponent,
    VhsEffectComponent,
    VhsFooterComponent,
    ContentComponent,
    MainComponent,
    NavComponent,
    NavContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor() {}
}