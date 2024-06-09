import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeCounterComponent } from '../../shared/time-counter/time-counter.component';

@Component({
  selector: 'app-vhs-effect',
  standalone: true,
  imports: [CommonModule, TimeCounterComponent],
  templateUrl: './vhs-effect.component.html',
  styleUrl: './vhs-effect.component.scss'
})

export class VhsEffectComponent implements OnInit {
  isFlashing: boolean = false;
  timeoutDelay: number = 5000;
  glitchLines: number[] = [];

  ngOnInit(): void {
    this.startFlashAnimation();
    let timeout = setTimeout(()=>{
      this.stopFlashAnimation();
      clearTimeout(timeout);
    }, this.timeoutDelay);
  }

  startFlashAnimation() {
    this.isFlashing = true;
  }

  stopFlashAnimation() {
    this.isFlashing = false;
  }

}
