import { Component, OnInit, ViewChild, inject, ElementRef, Renderer2 } from '@angular/core';
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

export class GameLauncher2000Component implements OnInit {
  // score
  score: number = 0;
  scoreMin: number = 0;
  scoreMax: number = 99999;
  stepIncrementScore: number = 50;
  // health
  health: number = 0;
  healthMin: number = 0;
  healthMax: number = 100;
  // gameplay
  gameIsStarted: boolean = false;
  gameIsOver: boolean = false;
  mouseIsInsideGameContainer!: boolean | null;
  mouseClientX!: number;
  // services
  renderer = inject(Renderer2);
  gameService = inject(GameService);

  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  @ViewChild('gameCursor', { static: true }) gameCursor!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.initNewGame();
  }

  get storedScore(): number {
    return LocalStorageService.getNumberFromLocalStorage('player-score') || 0;
  }

  get storedHighScore(): number {
    return LocalStorageService.getNumberFromLocalStorage('player-highscore') || 0;
  }

  storeScore(): void {
    LocalStorageService.setInLocalStorage('player-score', this.score);
  }

  storeHighScore(): void {
    if(this.score > this.storedHighScore) {
      LocalStorageService.setInLocalStorage('player-highscore', this.score);
    }
  }

  updateScore(): void {
    if(this.score > this.scoreMin && this.score < this.scoreMax) {
      this.score += this.stepIncrementScore;
      this.storeScore();
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

  initNewGame(): void {
    this.score = this.scoreMin;
    this.health = this.healthMin;
    this.gameIsOver = false;
    this.mouseIsInsideGameContainer = null;
  }

  startGame(): void {
    this.gameIsStarted = true;
  }

  stopGame(): void {
    this.gameIsStarted = false;
    this.storeHighScore();
  }

  gameOver(): void {
    this.gameIsOver = true;
  }

  onMouseEnterGameContainer(): void {
    this.mouseIsInsideGameContainer = true;
  }

  onMouseLeaveGameContainer(): void {
    this.mouseIsInsideGameContainer = false;
  }

  onMouseMoveIntoView(event: MouseEvent): void {
    const clientX = event.clientX;
    this.gameCursorFollowMouse(clientX);
  }

  onClickStartGame(): void {
    this.initNewGame();
    this.startGame();
  }

  onClickStopGame(): void {
    this.stopGame();
  }

  onClickRetryGame(): void {
    this.initNewGame();
  }

  gameCursorFollowMouse(clientX: number): void {
    if(this.gameIsStarted) {
      const gameCursorElement = this.gameCursor.nativeElement as HTMLElement;
      this.renderer.removeClass(gameCursorElement, '-translate-x-2/4');
      this.renderer.removeClass(gameCursorElement, 'left-[50%]');
      this.renderer.addClass(gameCursorElement, 'left-[-37.5%]');
      this.renderer.setStyle(gameCursorElement, 'transform', `translateX(${clientX}px)`);
    }
  }

}