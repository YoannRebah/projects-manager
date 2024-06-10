import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GameService } from '../../../shared/services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, OnDestroy {

  // service
  isRunning: boolean = false;
  private gameSubscription!: Subscription;
  private scoreSubscription!: Subscription;
  private meteorSubscription!: Subscription;
  private meteorIntervalAdjustSubscription!: Subscription;
  private collisionCheckSubscription!: Subscription;

  // game container
  isInGameContainer: boolean = false;

  // score
  score: number = 0;
  scoreMin: number = 0;
  scoreMax: number = 99999;
  highScore: number = 0;
  scoreStepIncrease: number = 50;
  keyHighScore: string = 'player-high-score';

  // health
  health: number = 100;
  healthMin: number = 0;
  healthMax: number = 100;

  // mouse
  mouseIsMovingOnce: boolean = false;
  clientX: number = 0;

  // collision box
  collisionBoxIsHitted: boolean = false;

  // meteor
  meteorIntervalSpeedGeneration: number = 1000;  // initial interval in milliseconds

  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  @ViewChild('gameCursor', { static: true }) gameCursor!: ElementRef;
  @ViewChild('collisionBox', { static: true }) collisionBox!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.gameSubscription = this.gameService.isRunning$.subscribe(isRunning => {
      this.isRunning = isRunning;
      if (isRunning) {
        this.initScore();
        this.initMeteor();
        this.initMeteorIntervalAdjustment();
        this.startCollisionCheck();
      } else {
        this.cancelScore();
        this.cancelMeteor();
        this.stopMeteorIntervalAdjustment();
        this.stopCollisionCheck();
      }
    });
  }

  ngOnDestroy() {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    this.cancelScore();
    this.cancelMeteor();
    this.stopMeteorIntervalAdjustment();
    this.stopCollisionCheck();
  }

  // GAME SERVICE

  startGame() {
    this.gameService.start();
    this.storeHighScore();
    this.highScore = this.playerHighScore;
  }

  stopGame() {
    this.gameService.stop();
    this.updateHighScore();
    this.cancelScore();
    this.cancelMeteor();
    this.stopMeteorIntervalAdjustment();
    this.stopCollisionCheck();
    this.removeAllMeteors();
    this.resetGameVariables();
  }

  // GAME

  resetGameVariables(): void {
    this.score = this.scoreMin;
    this.health = this.healthMax;
    this.mouseIsMovingOnce = false;
  }

  // SCORE

  initScore(): void {
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.scoreSubscription = timer$.subscribe(() => {
        this.ngZone.run(() => {
          this.updatePlayerScore();
          this.cdr.detectChanges();
        });
      });
    });
  }

  cancelScore(): void {
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }
  }

  updatePlayerScore(): void {
    if(this.score <= this.scoreMax) {
      this.score += this.scoreStepIncrease;
    }
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

  get playerHighScore(): number {
    if (this.isLocalStorageAvailable()) {
      return parseInt(localStorage.getItem(this.keyHighScore)!, 10);
    }
    return 0;
  }

  updateHighScore(): void {
    if(this.playerHighScore > this.score) {
      this.highScore = this.playerHighScore;
    } else {
      this.highScore = this.score;
    }
    this.storeHighScore();
  }

  storeHighScore(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.keyHighScore, JSON.stringify(this.highScore));
    }
  }

  // METEOR

  get randomMeteorClassNamesIndex(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  get randomMeteorLeftPosition(): number {
    return Math.floor(Math.random() * 101);
  }

  get randomMeteorWidth(): number {
    return Math.floor(Math.random() * 61) + 20;
  }

  initMeteor(): void {
    if (this.meteorSubscription) {
      this.meteorSubscription.unsubscribe();
    }
    this.ngZone.runOutsideAngular(() => {
      this.meteorSubscription = timer(0, this.meteorIntervalSpeedGeneration).subscribe(() => {
        this.ngZone.run(() => {
          this.createMeteor();
          this.cdr.detectChanges();
        });
      });
    });
  }

  cancelMeteor(): void {
    if (this.meteorSubscription) {
      this.meteorSubscription.unsubscribe();
    }
  }

  createMeteor(): void {
    const meteorTimestamp = this.defineMeteorTimestamp();
    const gameContainer = this.gameContainer.nativeElement;
    const meteor = this.renderer.createElement('img');
    this.renderer.setAttribute(meteor, 'src', 'assets/images/meteor.png');
    this.renderer.setAttribute(meteor, 'data-damage', this.defineMeteorDamages(this.randomMeteorWidth));
    this.renderer.setAttribute(meteor, 'data-timestamp', meteorTimestamp.toString());
    this.renderer.addClass(meteor, "meteor");
    this.renderer.addClass(meteor, `meteor-falling-animation-${this.randomMeteorClassNamesIndex}`);
    this.renderer.setStyle(meteor, 'left', `${this.randomMeteorLeftPosition}%`);
    this.renderer.setStyle(meteor, 'width', `${this.randomMeteorWidth}px`);
    this.renderer.appendChild(gameContainer, meteor);
    this.removeOldMeteors();
  }

  defineMeteorDamages(width: number): string {
    let damage: string = "0";
    if(width < 40) damage = "10";
    if(width > 40 && width < 60) damage = "20";
    if(width > 60) damage = "30";
    return damage;
  }

  defineMeteorTimestamp(): number {
    const now: Date = new Date();
    const timestamp: number = now.getTime(); 
    return timestamp;
  }

  meteorMustBeRemoved(timestamp: number): boolean {
    const now: number = new Date().getTime();
    const meteorTimestamp: number = new Date(timestamp).getTime();
    const difference = now - meteorTimestamp;
    return difference >= 10000;
  }

  removeOldMeteors(): void {
    const gameContainer = this.gameContainer.nativeElement;
    const meteors = gameContainer.querySelectorAll('.meteor');

    for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i] as HTMLElement;
        const timestamp = parseInt(meteor.getAttribute('data-timestamp') || '0', 10);
        if (this.meteorMustBeRemoved(timestamp)) {
            this.renderer.removeChild(gameContainer, meteor);
        }
    }
  }

  removeAllMeteors(): void {
    const gameContainer = this.gameContainer.nativeElement;
    const meteors = gameContainer.querySelectorAll('.meteor');

    meteors.forEach((elem: Element)=>{
      this.renderer.removeChild(gameContainer, elem);
    });
  }

  // METEOR INTERVAL SPEED GENERATION

  initMeteorIntervalAdjustment(): void {
    this.meteorIntervalSpeedGeneration = 1000;
    if (this.meteorIntervalAdjustSubscription) {
      this.meteorIntervalAdjustSubscription.unsubscribe();
    }
    this.ngZone.runOutsideAngular(() => {
      const adjustInterval$ = interval(3000);
      this.meteorIntervalAdjustSubscription = adjustInterval$.subscribe(() => {
        this.ngZone.run(() => {
          this.increaseSpeedMeteorInterval();
          this.cdr.detectChanges();
        });
      });
    });
  }

  stopMeteorIntervalAdjustment(): void {
    if (this.meteorIntervalAdjustSubscription) {
      this.meteorIntervalAdjustSubscription.unsubscribe();
    }
  }

  increaseSpeedMeteorInterval(): void {
    if (this.meteorIntervalSpeedGeneration > 100) {
      this.meteorIntervalSpeedGeneration -= 50;
      this.cancelMeteor();
      this.initMeteor();
    }
  }

  // MOUSE

  @HostListener('document:mousemove', ['$event'])
  onMouseMoveIntoGameContainer(event: MouseEvent): void {
    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    this.isInGameContainer = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;

    if (this.isInGameContainer) {
      this.mouseIsMovingOnce = true;
      this.clientX = event.clientX;
      this.renderer.setStyle(this.gameCursor.nativeElement, 'transform', `translateX(${this.clientX}px)`);

      if (!this.isRunning) {
        this.startGame();
      }

    } else if (!this.isInGameContainer) {
      if (this.isRunning) {
        this.stopGame();
      }
    }
  }

  // COLLISION CHECK

  startCollisionCheck(): void {
    if (this.collisionCheckSubscription) {
      this.collisionCheckSubscription.unsubscribe();
    }
    this.ngZone.runOutsideAngular(() => {
      const checkInterval$ = interval(100);
      this.collisionCheckSubscription = checkInterval$.subscribe(() => {
        this.ngZone.run(() => {
          this.checkCollisions();
          this.cdr.detectChanges();
        });
      });
    });
  }

  stopCollisionCheck(): void {
    if (this.collisionCheckSubscription) {
      this.collisionCheckSubscription.unsubscribe();
    }
  }

  checkCollisions(): void {
    const collisionBox = this.collisionBox.nativeElement.getBoundingClientRect();
    const meteors = this.gameContainer.nativeElement.querySelectorAll('.meteor');

    meteors.forEach((meteor: Element) => {
      const meteorRect = (meteor as HTMLElement).getBoundingClientRect();
      if (this.isColliding(collisionBox, meteorRect)) {
        const damage = meteor.getAttribute('data-damage');
        this.handleCollision(damage);
        this.renderer.removeChild(this.gameContainer.nativeElement, meteor);
      }
    });
  }

  isColliding(rect1: DOMRect, rect2: DOMRect): boolean {
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
  }

  handleCollision(damage: string | null): void {
    if (damage) {
      if(parseInt(damage) > 0) {
        const thisDamage = parseInt(damage)*-1;
        this.updateHealth(thisDamage);
      }
    }
  }

  // HEALTH

  updateHealth(delta: number): void {
    this.health += delta;
    if(this.health <= this.healthMin) {
      this.health = this.healthMin;
      this.stopGame();
    }
    if(this.health >= this.healthMax) {
      this.health = this.healthMax;
    }
  }

}
