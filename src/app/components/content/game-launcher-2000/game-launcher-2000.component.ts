import { Component, ViewChild, inject, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../shared/services/components/game.service';
import { LocalStorageService } from '../../../shared/services/utilities/local-storage.service';

@Component({
  selector: 'app-game-launcher-2000',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-launcher-2000.component.html',
  styleUrl: './game-launcher-2000.component.scss'
})

export class GameLauncher2000Component {
  gameIsOver: boolean = false;
  score: number = 0;
  scoreMin: number = 0;
  scoreMax: number = 99999;
  highScore!: number;
  stepIncrementScore: number = 50;
  health: number = 0;
  healthMin: number = 0;
  healthMax: number = 100;
  mouseIsInsideGameContainer: boolean = false;
  mouseClientX: number | null = null;

  renderer = inject(Renderer2);
  gameService = inject(GameService);

  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  @ViewChild('gameCursor', { static: true }) gameCursor!: ElementRef;

  get storedScore(): void {
    if(LocalStorageService.testIsAvailable()) {
      return JSON.parse(localStorage.getItem('player-score') || '0');
    }
  }

  storeScore(): void {
    if(LocalStorageService.testIsAvailable()) {
      localStorage.setItem('player-score', JSON.stringify(this.score));
    }
  }

  get storedHighScore(): void {
    if(LocalStorageService.testIsAvailable()) {
      return JSON.parse(localStorage.getItem('player-high-score') || '0');
    }
  }

  storeHighScore(): void {
    if(LocalStorageService.testIsAvailable()) {
      localStorage.setItem('player-high-score', JSON.stringify(this.highScore));
    }
  }

  updateScore(): void {
    if(this.score > this.scoreMin && this.score < this.scoreMax) {
      this.score += this.stepIncrementScore;
    }
  }

  setHealth(delta: number): void {
    this.health += delta;
    if(this.health <= this.healthMin) {
      this.health = this.healthMin;
      this.stopGame();
    }
    if(this.health >= this.healthMax) {
      this.health = this.healthMax;
    }
  }

  startNewGame(): void {
    this.score = this.scoreMin;
    this.health = this.healthMin;
    this.gameIsOver = false;
  }

  stopGame(): void {
    this.gameIsOver = true;
    this.storeScore();
    this.storeHighScore();
  }

  onClickQuitGame(): void {
    
  }

  onClickRetryGame(): void {

  }

  onMouseEnterGameContainer(): void {
    this.mouseIsInsideGameContainer = true;
  }

  onMouseLeaveGameContainer(): void {
    this.mouseIsInsideGameContainer = false;
  }

  onMouseMoveIntoView(event: MouseEvent): void {
    const clientX = event.clientX;
    console.log(this.mouseIsInsideGameContainer)
    this.gameCursorFollowMouse(clientX);
  }

  gameCursorFollowMouse(clientX: number): void {
    if(this.mouseIsInsideGameContainer) {
      const gameCursorElement = this.gameCursor.nativeElement as HTMLElement;
      this.renderer.removeClass(gameCursorElement, '-translate-x-2/4');
      this.renderer.removeClass(gameCursorElement, 'left-[50%]');
      this.renderer.addClass(gameCursorElement, 'left-[-36%]');
      this.renderer.setStyle(gameCursorElement, 'transform', `translateX(${clientX}px)`);
    }
  }

}