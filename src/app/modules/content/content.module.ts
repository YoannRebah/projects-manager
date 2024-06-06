import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkillsComponent } from '../../components/list-skills/list-skills.component';
import { ToolsOverviewComponent } from '../../components/tools-overview/tools-overview.component';

@NgModule({
  declarations: [
    ListSkillsComponent,
    ToolsOverviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListSkillsComponent,
    ToolsOverviewComponent
  ]
})

export class ContentModule { }
