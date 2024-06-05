import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { VhsEffectComponent } from '../../components/vhs-effect/vhs-effect.component';

@NgModule({
  declarations: [
    LoaderComponent,
    VhsEffectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    VhsEffectComponent
  ]
})
export class OverlayModule { }
