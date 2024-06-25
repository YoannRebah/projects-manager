import { Component, OnInit, ViewChild, inject, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../shared/services/components/game.service';
import { LocalStorageService } from '../../../shared/services/utilities/local-storage.service';
import { WindowRefService } from '../../../shared/services/utilities/window-ref.service';
import { DatetimeService } from '../../../shared/services/utilities/datetime.service';

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
  timeDelayUpdateScoreMs: number = 1000;
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
  animationDelayMs: number = 8000;
  animationDelayStepDecrementMs: number = 30;
  animationDelayMinMs: number = 500;
  // stellar objects
  stellarObjectsIntervalId!: number; 
  timeDelayUpdateStellarObjectsMs: number = 400;
  // services
  renderer = inject(Renderer2);
  gameService = inject(GameService);
  windowRefService = inject(WindowRefService);
  // storage
  keyScore: string = LocalStorageService.commonPrefixKey + 'player-score';
  keyHighScore: string = LocalStorageService.commonPrefixKey + 'player-high-score';

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
      }, this.timeDelayUpdateScoreMs);
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
    this.updateCreateRandomStellarObject();
  }

  pauseGame(): void {
    this.gameIsPaused = true;
    clearInterval(this.scoreIntervalId);
    this.pauseAllStellarObjectsAnimation();
    clearInterval(this.stellarObjectsIntervalId);
  }

  resumeGame(): void {
    this.gameIsPaused = false;
    this.updateScore(); 
    this.updateCreateRandomStellarObject();
    this.resumeAllStellarObjectsAnimation();
  }

  stopGame(): void {
    this.gameIsStarted = false;
    this.gameIsPaused = false;
    this.storeHighScore();
    this.setGameCursorStyles("reset");
    clearInterval(this.scoreIntervalId);
    clearInterval(this.stellarObjectsIntervalId);
    this.removeAllStellarObjects();
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

  // ====================================================================

  get randomStellarObjectImgIndex(): number {
    const rand = Math.random();
    if (rand < 0.90) {
        return 1;  // 90% de chance
    } else if (rand < 0.98) {
        return 2;  // 8%
    } else {
        return 3;  // 2%
    }
  }

  get randomStellarObjectClassNamesIndex(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  get randomStellarObjectLeftPosition(): number {
    return Math.floor(Math.random() * 91);
  }

  get randomObjectWidth(): number {
    return Math.floor(Math.random() * 71) + 70;
  }

  createRandomStellarObject(): void {
    const meteorTimestamp = DatetimeService.timestampNow;
    const gameContainer = this.gameContainer.nativeElement;
    const randomWidth = this.randomObjectWidth;
    const randomStellarObjectImgIndex = this.randomStellarObjectImgIndex;

    if(this.animationDelayMs > this.animationDelayMinMs) {
      this.animationDelayMs -= this.animationDelayStepDecrementMs;
    }

    const stellarObject = this.renderer.createElement('img');
    this.renderer.addClass(stellarObject, 'stellar-object');
    this.renderer.addClass(stellarObject, 'absolute');
    this.renderer.setAttribute(stellarObject, 'src', `assets/images/stellar-object-${randomStellarObjectImgIndex}.png`);
    this.renderer.setAttribute(stellarObject, 'data-damage', this.defineStellarObjectDamages(randomWidth));
    this.renderer.setAttribute(stellarObject, 'data-timestamp', meteorTimestamp.toString());
   
    this.renderer.setStyle(stellarObject, 'left', `${this.randomStellarObjectLeftPosition}%`);
    this.renderer.setStyle(stellarObject, 'width', `${randomWidth}px`);
    this.renderer.setStyle(stellarObject, 'animationDuration', `${this.animationDelayMs}ms`);
  
    this.renderer.appendChild(gameContainer, stellarObject);

    this.removeOldStellarObject();
  }

  updateCreateRandomStellarObject(): void {
    this.stellarObjectsIntervalId = this.windowRefService.windowRef.setInterval(() => {
      if (!this.gameIsPaused) {
        this.createRandomStellarObject();
      }
    }, this.timeDelayUpdateStellarObjectsMs);
  }

  defineStellarObjectDamages(width: number): string {
    let damage: string = "0";
    if(width > 0 && width < 20) damage = "5";
    if(width >= 20 && width <= 40) damage = "10";
    if(width >= 40 && width <= 60) damage = "15";
    if(width > 60) damage = "20";
    return damage;
  }

  stellarObjectIsExpired(timestamp: number): boolean {
    const now: number = new Date().getTime();
    const meteorTimestamp: number = new Date(timestamp).getTime();
    const difference = now - meteorTimestamp;
    return difference >= 30000;
  }

  removeOldStellarObject(): void {
    const gameContainer = this.gameContainer.nativeElement;
    const stellarObjects = gameContainer.querySelectorAll('.stellar-object');

    for (let i = stellarObjects.length - 1; i >= 0; i--) {
        const stellarObject = stellarObjects[i] as HTMLElement;
        const timestamp = parseInt(stellarObject.getAttribute('data-timestamp') || '0', 10);
        if (this.stellarObjectIsExpired(timestamp)) {
          this.renderer.removeChild(gameContainer, stellarObject);
        }
    }
  }

  removeAllStellarObjects(): void {
    const gameContainer = this.gameContainer.nativeElement;
    const stellarObjects = gameContainer.querySelectorAll('.stellar-object');
    stellarObjects.forEach((elem: HTMLElement)=>{
      elem.remove();
    });
  }

  pauseAllStellarObjectsAnimation(): void {
    const gameContainer = this.gameContainer.nativeElement;
    const stellarObjects = gameContainer.querySelectorAll('.stellar-object');
    stellarObjects.forEach((elem: HTMLElement)=>{
      elem.style.animationPlayState = 'paused';
    });
  }

  resumeAllStellarObjectsAnimation(): void {
    const gameContainer = this.gameContainer.nativeElement;
    const stellarObjects = gameContainer.querySelectorAll('.stellar-object');
    stellarObjects.forEach((elem: HTMLElement)=>{
      elem.style.animationPlayState = 'running';
    });
  }

}