import { Component, OnInit, ViewChild, inject, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../shared/services/components/game.service';
import { LocalStorageService } from '../../../shared/services/utilities/local-storage.service';
import { WindowRefService } from '../../../shared/services/utilities/window-ref.service';

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
  scoreIntervalId!: number; 
  // health
  health: number = 0;
  healthMin: number = 0;
  healthMax: number = 100;
  // gameplay
  gameIsPaused: boolean = false;
  gameIsStarted: boolean = false;
  gameIsOver: boolean = false;
  mouseIsInsideGameContainer!: boolean | null;
  mouseClientX!: number;
  // services
  renderer = inject(Renderer2);
  gameService = inject(GameService);
  windowRefService = inject(WindowRefService);
  // storage
  keyScore: string = 'player-score';
  keyHighScore: string = 'player-high-score';

  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  @ViewChild('gameCursor', { static: true }) gameCursor!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.initNewGame();
  }

  onMouseEnterGameContainer(): void {
    this.mouseIsInsideGameContainer = true;
    if(this.gameIsStarted && this.gameIsPaused) {
      this.resumeGame();
    }
  }

  onMouseLeaveGameContainer(): void {
    this.mouseIsInsideGameContainer = false;
    if(this.gameIsStarted && !this.gameIsPaused) {
      this.pauseGame();
    }
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

  // ===========================================================================

  get storedScore(): number {
    if (LocalStorageService.testIsAvailable()) {
      return parseInt(localStorage.getItem(this.keyScore)!, 10);
    }
    return 0;
  }

  get storedHighScore(): number {
    if (LocalStorageService.testIsAvailable()) {
      if(localStorage.getItem(this.keyHighScore)) {
        return parseInt(localStorage.getItem(this.keyHighScore)!, 10);
      } else {
        return 0;
      }
    }
    return 0;
  }

  storeScore(): void {
    if (LocalStorageService.testIsAvailable()) {
      localStorage.setItem(this.keyScore, JSON.stringify(this.score));
    }
  }

  storeHighScore(): void {
    if (LocalStorageService.testIsAvailable()) {
      if(this.score > this.storedHighScore) {
        localStorage.setItem(this.keyHighScore, JSON.stringify(this.score));
      }
    }
  }

  updateScore(): void {
    if (this.score < this.scoreMax) {
      this.scoreIntervalId = this.windowRefService.windowRef.setInterval(() => {
        if (!this.gameIsPaused) {
          this.score += this.stepIncrementScore;
          this.storeScore();
        }
      }, 1000);
    }
  }

  // ===========================================================================

  setHealth(delta: number): void {
    this.health += delta;
    if(this.health <= this.healthMin) {
      this.health = this.healthMin;
      this.gameOver();
    }
    if(this.health >= this.healthMax) {
      this.health = this.healthMax;
    }
  }

  // ===========================================================================

  initNewGame(): void {
    this.score = this.scoreMin;
    this.health = this.healthMax;
    this.gameIsOver = false;
    this.mouseIsInsideGameContainer = null;
    this.gameIsPaused = false;
    this.setGameCursorStyles("reset");
  }

  startGame(): void {
    this.gameIsStarted = true;
    this.updateScore();
  }

  pauseGame(): void {
    this.gameIsPaused = true;
    clearInterval(this.scoreIntervalId);
  }

  resumeGame(): void {
    this.gameIsPaused = false;
    this.updateScore(); 
  }

  stopGame(): void {
    this.gameIsStarted = false;
    this.gameIsPaused = false;
    this.storeHighScore();
    this.setGameCursorStyles("reset");
    clearInterval(this.scoreIntervalId);
  }

  gameOver(): void {
    this.gameIsOver = true;
    this.stopGame();
  }

  gameCursorFollowMouse(clientX: number): void {
    const gameCursorElement = this.gameCursor.nativeElement as HTMLElement;
    if(this.gameIsStarted) {
      this.setGameCursorStyles("init");
      if(!this.gameIsPaused) {
        this.renderer.setStyle(gameCursorElement, 'transform', `translateX(${clientX}px)`);
      }
    }
  }

  setGameCursorStyles(state: string): void {
    const gameCursorElement = this.gameCursor.nativeElement as HTMLElement;
    if(state === "init") {
      this.renderer.removeClass(gameCursorElement, '-translate-x-2/4');
      this.renderer.removeClass(gameCursorElement, 'left-[50%]');
      this.renderer.addClass(gameCursorElement, 'left-[-37.5%]');
    }
    if(state === "reset") {
      this.renderer.addClass(gameCursorElement, '-translate-x-2/4');
      this.renderer.addClass(gameCursorElement, 'left-[50%]');
      this.renderer.removeClass(gameCursorElement, 'left-[-37.5%]');
      this.renderer.setStyle(gameCursorElement, 'transform', `translateX(-36px)`);
    }
  }

}