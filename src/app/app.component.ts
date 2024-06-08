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
import { SkillsComponent } from './components/content/skills/skills.component';
import { NotableAchievementsComponent } from './components/content/notable-achievements/notable-achievements.component';
import { ToolsOverviewComponent } from './components/content/tools-overview/tools-overview.component';
import { MarqueeInterestsComponent } from './components/content/marquee-interests/marquee-interests.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { LocationComponent } from './components/content/location/location.component';
import { ArcadeRoomComponent } from './components/content/arcade-room/arcade-room.component';
import { ReferencesInspirationsComponent } from './components/content/references-inspirations/references-inspirations.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { IntroductionComponent } from './components/content/introduction/introduction.component';
import { AdvertisementComponent } from './components/content/advertisement/advertisement.component';

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
    SkillsComponent,
    NotableAchievementsComponent,
    ToolsOverviewComponent,
    MarqueeInterestsComponent,
    ContactComponent,
    LocationComponent,
    ArcadeRoomComponent,
    ReferencesInspirationsComponent,
    FooterComponent,
    IntroductionComponent,
    AdvertisementComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'portfolio';
}
