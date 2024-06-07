import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../../timer/timer.component';

@Component({
  selector: 'app-vhs-effect',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './vhs-effect.component.html',
  styleUrl: './vhs-effect.component.scss'
})

export class VhsEffectComponent {}
