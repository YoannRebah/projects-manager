import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkillsComponent } from '../../components/list-skills/list-skills.component';
import { ToolsOverviewComponent } from '../../components/tools-overview/tools-overview.component';
import { NotableAchievementsComponent } from '../../components/notable-achievements/notable-achievements.component';

@NgModule({
  declarations: [
    ListSkillsComponent,
    ToolsOverviewComponent,
    NotableAchievementsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListSkillsComponent,
    ToolsOverviewComponent,
    NotableAchievementsComponent
  ]
})

export class ContentModule { }
