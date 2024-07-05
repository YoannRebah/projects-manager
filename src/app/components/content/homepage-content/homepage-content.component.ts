import { Component } from '@angular/core';
// base
import { H1Component } from '../../base/h1/h1.component';
import { H2Component } from '../../base/h2/h2.component';
// layout
import { ContentComponent } from '../../layout/content/content.component';
import { NavComponent } from '../../layout/nav/nav.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { SectionComponent } from '../../layout/section/section.component';
import { FooterComponent } from '../../layout/footer/footer.component';
// content
import { NavContentComponent } from '../nav-content/nav-content.component';
import { IntroductionComponent } from '../introduction/introduction.component';
import { SkillsComponent } from '../skills/skills.component';
import { AdsPosterComponent } from '../ads-poster/ads-poster.component';
import { AchievementsComponent } from '../achievements/achievements.component';
import { ToolsOverviewComponent } from '../tools-overview/tools-overview.component';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { LocationComponent } from '../location/location.component';
import { MarqueeInterestsComponent } from '../marquee-interests/marquee-interests.component';
import { ArcadeRoomComponent } from '../arcade-room/arcade-room.component';
import { FormContactComponent } from '../form-contact/form-contact.component';
import { TvProgramComponent } from '../tv-program/tv-program.component';
import { TerminalComponent } from '../terminal/terminal.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterContentComponent } from '../footer-content/footer-content.component';
// modals
import { ModalSettingsComponent } from '../../modals/modal-settings/modal-settings.component';
import { ModalTerminalHelpComponent } from '../../modals/modal-terminal-help/modal-terminal-help.component';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [
    // base
    H1Component,
    H2Component,
    // layout
    ContentComponent,
    NavComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
    // content
    NavContentComponent,
    IntroductionComponent,
    SkillsComponent,
    AdsPosterComponent,
    AchievementsComponent,
    ToolsOverviewComponent,
    EmployeeCardComponent,
    LocationComponent,
    MarqueeInterestsComponent,
    ArcadeRoomComponent,
    FormContactComponent,
    TvProgramComponent,
    TerminalComponent,
    MenuComponent,
    FooterContentComponent,
    // modals
    ModalSettingsComponent,
    ModalTerminalHelpComponent,
  ],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss'
})

export class HomepageContentComponent {
  constructor() {}
}
