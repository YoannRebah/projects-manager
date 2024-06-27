import { Component, OnInit, inject } from '@angular/core';
// services
import { LoaderService } from '../../shared/services/components/loader.service';
// layout
import { MainComponent } from '../../components/layout/main/main.component';
import { ContentComponent } from '../../components/layout/content/content.component';
import { SectionComponent } from '../../components/layout/section/section.component';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { NavComponent } from '../../components/layout/nav/nav.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
// base
import { LoaderComponent } from '../../components/base/loader/loader.component';
import { VhsEffectComponent } from '../../components/base/vhs-effect/vhs-effect.component';
import { H1Component } from '../../components/base/h1/h1.component';
import { H2Component } from '../../components/base/h2/h2.component';
// content
import { TvProgramComponent } from '../../components/base/tv-program/tv-program.component';
import { NavContentComponent } from '../../components/content/nav-content/nav-content.component';
import { FooterContentComponent } from '../../components/content/footer-content/footer-content.component';
import { TerminalComponent } from '../../components/base/terminal/terminal.component';
import { EmployeeCardComponent } from '../../components/content/employee-card/employee-card.component';
import { SkillsComponent } from '../../components/content/skills/skills.component';
import { AchievementsComponent } from '../../components/content/achievements/achievements.component';
import { ToolsOverviewComponent } from '../../components/content/tools-overview/tools-overview.component';
import { MarqueeInterestsComponent } from '../../components/content/marquee-interests/marquee-interests.component';
import { LocationComponent } from '../../components/content/location/location.component';
import { ArcadeRoomComponent } from '../../components/content/arcade-room/arcade-room.component';
import { IntroductionComponent } from '../../components/content/introduction/introduction.component';
import { FormContactComponent } from '../../components/content/form-contact/form-contact.component';
import { AdsPosterComponent } from '../../components/content/ads-poster/ads-poster.component';
import { BlogComponent } from '../../components/content/blog/blog.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    // layout
    MainComponent,
    ContentComponent,
    NavComponent,
    FooterComponent,
    SectionComponent,
    HeaderComponent,
    // base
    H1Component,
    H2Component,
    LoaderComponent,
    VhsEffectComponent,
    TvProgramComponent,
    TerminalComponent,
    // content
    EmployeeCardComponent,
    SkillsComponent,
    AchievementsComponent,
    ToolsOverviewComponent,
    MarqueeInterestsComponent,
    LocationComponent,
    ArcadeRoomComponent,
    IntroductionComponent,
    NavContentComponent,
    FooterContentComponent,
    FormContactComponent,
    AdsPosterComponent,
    BlogComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements OnInit{ 
  loaderService = inject(LoaderService);

  constructor() {}

  ngOnInit(): void {
    this.loaderService.toggle();
  }
}