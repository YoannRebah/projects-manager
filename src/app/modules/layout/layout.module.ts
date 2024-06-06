import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';
import { SectionComponent } from '../../components/section/section.component';

@NgModule({
  declarations: [
    HeroBannerComponent,
    SectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeroBannerComponent,
    SectionComponent
  ]
})

export class LayoutModule { }
