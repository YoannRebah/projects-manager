import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})

export class AchievementsComponent {
  activeIndex: number = 0;
  indexMin: number = 0;
  indexMax: number = 3;

  setActive(index: number): void {
    this.activeIndex = index;
  }

  triggerPrev(): void {
    if(this.activeIndex > this.indexMin) {
      this.activeIndex--
    } else {
      this.activeIndex = this.indexMax
    }
  }

  triggerNext(): void {
    if(this.activeIndex < this.indexMax) {
      this.activeIndex++
    } else {
      this.activeIndex = this.indexMin
    }
  }

}