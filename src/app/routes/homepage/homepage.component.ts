import { Component } from '@angular/core';
// base
import { H1Component } from '../../components/base/h1/h1.component';
import { H2Component } from '../../components/base/h2/h2.component';
// content
import { EmployeeCardComponent } from '../../components/content/employee-card/employee-card.component';
import { SkillsComponent } from '../../components/content/skills/skills.component';
import { AchievementsComponent } from '../../components/content/achievements/achievements.component';
import { ToolsOverviewComponent } from '../../components/content/tools-overview/tools-overview.component';
import { MarqueeInterestsComponent } from '../../components/content/marquee-interests/marquee-interests.component';
import { LocationComponent } from '../../components/content/location/location.component';
import { ArcadeRoomComponent } from '../../components/content/arcade-room/arcade-room.component';
import { IntroductionComponent } from '../../components/content/introduction/introduction.component';
import { ListNavComponent } from '../../components/content/list-nav/list-nav.component';
import { ListFooterComponent } from '../../components/content/list-footer/list-footer.component';
import { FormContactComponent } from '../../components/content/form-contact/form-contact.component';
import { AdsPosterComponent } from '../../components/content/ads-poster/ads-poster.component';
import { BlogComponent } from '../../components/content/blog/blog.component';
// layout
import { ContentComponent } from '../../components/layout/content/content.component';
import { SectionComponent } from '../../components/layout/section/section.component';
import { HeaderComponent } from '../../components/layout/header/header.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    // base
    H1Component,
    H2Component,
    // content
    EmployeeCardComponent,
    SkillsComponent,
    AchievementsComponent,
    ToolsOverviewComponent,
    MarqueeInterestsComponent,
    LocationComponent,
    ArcadeRoomComponent,
    IntroductionComponent,
    ListNavComponent,
    ListFooterComponent,
    FormContactComponent,
    AdsPosterComponent,
    BlogComponent,
    // layout
    ContentComponent,
    SectionComponent,
    HeaderComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent {  }