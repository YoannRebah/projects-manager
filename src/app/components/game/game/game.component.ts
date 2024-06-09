import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  keyHighScore: string = 'high-score';
  score: number = 0;
  scoreMin: number = 0;
  scoreMax: number = 99999;
  highScore: number = 0;
  scoreIsPaused: boolean = false;
  health: number = 100;
  healthMin: number = 0;
  healthMax: number = 100;
  gameIsOver: boolean = false;
  mouseIsMoving: boolean = false;
  collisionBoxIsHitted: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  get playerHighScore(): number {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.keyHighScore) ? parseInt(localStorage.getItem(this.keyHighScore)!, 10) : 0;
    }
    return 0;
  }

  get randomMeteorClassNamesIndex(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  get randomMeteorLeftPosition(): number {
    return Math.floor(Math.random() * 101);
  }

  get randomMeteorWidth(): number {
    return Math.floor(Math.random() * 61) + 20;
  }

  ngOnInit(): void {
    this.initGame();
  }

  isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  initGame(): void {
    this.highScore = this.playerHighScore;
    this.storeDefaultHighScore();
  }

  stopGame(): void {
    this.updateHighScore();
  }

  startScoreCounter(): void {
    if(this.score < this.scoreMax) {
      this.scoreIsPaused = false;
    }
  }

  pauseScoreCounter(): void {
    this.scoreIsPaused = true;
  }

  resumeScoreCounter(): void {
    this.scoreIsPaused = false;
  }

  resetScoreCounter(): void {
    this.score = this.scoreMin;
    this.scoreIsPaused = false;
  }

  storeDefaultHighScore(): void {
    if (this.isLocalStorageAvailable()) {
      if(localStorage.getItem(this.keyHighScore) == null) {
        localStorage.setItem(this.keyHighScore, JSON.stringify(0));
      }
    }
  }

  updateHighScore(): void {
    const highScore = this.playerHighScore;
    if(this.score > highScore) this.highScore = this.score;
    this.storeHighScore();
  }

  storeHighScore(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.keyHighScore, JSON.stringify(this.highScore));
    }
  }

  updateHealth(delta: number): void {
    this.health += delta;
    if(this.health <= this.healthMin) {
      this.health = this.healthMin;
      this.gameIsOver = true;
    }
    if(this.health >= this.healthMax) {
      this.health = this.healthMax;
    }
  }

  collisionBoxHitted(): void {
    this.collisionBoxIsHitted = true;
    let timeout = setTimeout(()=>{
      this.collisionBoxIsHitted = false;
      clearTimeout(timeout);
    }, 500)
  }

  createRandomMeteor(): void {
    const meteor = this.renderer.createElement('img');
    this.renderer.addClass(meteor, `meteor-falling-animation-${this.randomMeteorClassNamesIndex}`);
    this.renderer.setStyle(meteor, 'left', `${this.randomMeteorLeftPosition}%`);
    this.renderer.setStyle(meteor, 'width', `${this.randomMeteorWidth}px`);
    this.renderer.appendChild(this.el.nativeElement, meteor);
  }

}
