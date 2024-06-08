import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/overlay/loader/loader.component';
import { VhsEffectComponent } from './components/overlay/vhs-effect/vhs-effect.component';
import { SectionComponent } from './components/layout/section/section.component'; 
import { HeaderComponent } from './components/layout/header/header.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { FooterComponent } from './components/layout/footer/footer.component';
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
    HeaderComponent,
    NavComponent,
    FooterComponent,
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
    IntroductionComponent,
    AdvertisementComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'portfolio';
}
