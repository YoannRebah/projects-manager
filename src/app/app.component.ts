import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// services
import { LoaderService } from './shared/services/components/loader.service';
// base
import { LoaderComponent } from './components/base/loader/loader.component';
import { VhsEffectComponent } from './components/base/vhs-effect/vhs-effect.component';
// content
import { TvProgramComponent } from './components/content/tv-program/tv-program.component';
import { ListNavComponent } from './components/content/list-nav/list-nav.component';
import { ListFooterComponent } from './components/content/list-footer/list-footer.component';
import { TerminalComponent } from './components/content/terminal/terminal.component';
import { ModalAdminComponent } from './components/content/modal-admin/modal-admin.component';
// layout
import { MainComponent } from './components/layout/main/main.component';
import { ContentComponent } from './components/layout/content/content.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { FooterComponent } from './components/layout/footer/footer.component';
// routes
import { HomepageComponent } from './routes/homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // base
    LoaderComponent,
    // layout
    MainComponent,
    ContentComponent,
    NavComponent,
    FooterComponent,
    // content
    VhsEffectComponent,
    TvProgramComponent,
    ListNavComponent,
    ListFooterComponent,
    TerminalComponent,
    ModalAdminComponent,
    HomepageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.toggle();
  }

}