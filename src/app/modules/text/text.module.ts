import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { H1Component } from '../../components/h1/h1.component';
import { H2Component } from '../../components/h2/h2.component';

@NgModule({
  declarations: [
    H1Component,
    H2Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    H1Component,
    H2Component
  ]
})

export class TextModule { }
