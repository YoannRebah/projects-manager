import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {
  health: number = 100;
  healthMin: number = 0;
  healthMax: number = 100;
  currentScore: number = 0;
  highScore: number = 0;

  updateHealth(delta: number): void {
    this.health += delta;
    if(this.health <= this.healthMin) this.health = this.healthMin;
    if(this.health >= this.healthMax) this.health = this.healthMax;
  }

  updateHighScore(): void {
    if(this.currentScore > this.highScore) this.highScore = this.currentScore;
    localStorage.setItem('high-score', JSON.stringify(this.highScore));
  }

}
