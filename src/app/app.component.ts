import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/overlay/loader/loader.component';
import { VhsEffectComponent } from './components/overlay/vhs-effect/vhs-effect.component';
import { SectionComponent } from './components/layout/section/section.component'; 
import { HeroBannerComponent } from './components/layout/hero-banner/hero-banner.component';
import { NavComponent } from './components/navigation/nav/nav.component';
import { H1Component } from './components/text/h1/h1.component';
import { H2Component } from './components/text/h2/h2.component';
import { EmployeeCardComponent } from './components/content/employee-card/employee-card.component';
import { ListSkillsComponent } from './components/content/list-skills/list-skills.component';
import { NotableAchievementsComponent } from './components/content/notable-achievements/notable-achievements.component';
import { ToolsOverviewComponent } from './components/content/tools-overview/tools-overview.component';
import { MarqueeInterestsComponent } from './components/content/marquee-interests/marquee-interests.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    VhsEffectComponent,
    SectionComponent,
    HeroBannerComponent,
    NavComponent,
    H1Component,
    H2Component,
    EmployeeCardComponent,
    ListSkillsComponent,
    NotableAchievementsComponent,
    ToolsOverviewComponent,
    MarqueeInterestsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'portfolio';
}
