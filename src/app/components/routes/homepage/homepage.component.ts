import { Component } from '@angular/core';
// base
import { H1Component } from '../../base/h1/h1.component';
import { H2Component } from '../../base/h2/h2.component';
// content
import { EmployeeCardComponent } from '../../content/employee-card/employee-card.component';
import { SkillsComponent } from '../../content/skills/skills.component';
import { AchievementsComponent } from '../../content/achievements/achievements.component';
import { ToolsOverviewComponent } from '../../content/tools-overview/tools-overview.component';
import { MarqueeInterestsComponent } from '../../content/marquee-interests/marquee-interests.component';
import { LocationComponent } from '../../content/location/location.component';
import { ArcadeRoomComponent } from '../../content/arcade-room/arcade-room.component';
import { IntroductionComponent } from '../../content/introduction/introduction.component';
import { ListNavComponent } from '../../content/list-nav/list-nav.component';
import { ListFooterComponent } from '../../content/list-footer/list-footer.component';
import { FormContactComponent } from '../../content/form-contact/form-contact.component';
import { AdsPosterComponent } from '../../content/ads-poster/ads-poster.component';
import { BlogComponent } from '../../content/blog/blog.component';
// layout
import { ContentComponent } from '../../layout/content/content.component';
import { SectionComponent } from '../../layout/section/section.component'; 
import { HeaderComponent } from '../../layout/header/header.component';

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