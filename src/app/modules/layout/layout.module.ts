import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';

@NgModule({
  declarations: [
    HeroBannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeroBannerComponent
  ]
})

export class LayoutModule { }
