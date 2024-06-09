import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// overlay
import { LoaderComponent } from './components/overlay/loader/loader.component';
import { VhsEffectComponent } from './components/overlay/vhs-effect/vhs-effect.component';
// layout
import { MainComponent } from './components/layout/main/main.component';
import { SectionComponent } from './components/layout/section/section.component'; 
import { HeaderComponent } from './components/layout/header/header.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { FooterComponent } from './components/layout/footer/footer.component';
// text
import { H1Component } from './components/text/h1/h1.component';
import { H2Component } from './components/text/h2/h2.component';
// views
import { EmployeeCardComponent } from './components/views/employee-card/employee-card.component';
import { SkillsComponent } from './components/views/skills/skills.component';
import { NotableAchievementsComponent } from './components/views/notable-achievements/notable-achievements.component';
import { ToolsOverviewComponent } from './components/views/tools-overview/tools-overview.component';
import { MarqueeInterestsComponent } from './components/views/marquee-interests/marquee-interests.component';
import { ContactComponent } from './components/views/contact/contact.component';
import { LocationComponent } from './components/views/location/location.component';
import { ArcadeRoomComponent } from './components/views/arcade-room/arcade-room.component';
import { ReferencesInspirationsComponent } from './components/views/references-inspirations/references-inspirations.component';
import { IntroductionComponent } from './components/views/introduction/introduction.component';
import { AdvertisementComponent } from './components/views/advertisement/advertisement.component';
import { ListNavComponent } from './components/views/list-nav/list-nav.component';
import { ListFooterComponent } from './components/views/list-footer/list-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // overlay
    LoaderComponent,
    VhsEffectComponent,
    // layout
    MainComponent,
    SectionComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    // text
    H1Component,
    H2Component,
    // views
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
    AdvertisementComponent,
    ListNavComponent,
    ListFooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'portfolio';
}
