import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSkillsComponent } from '../../components/list-skills/list-skills.component';

@NgModule({
  declarations: [
    ListSkillsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListSkillsComponent
  ]
})

export class ContentModule { }
