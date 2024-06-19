import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, timer, Observable } from 'rxjs';
import { LocalStorageService } from '../../shared/services/utilities/local-storage.service';
import { GameService } from '../../shared/services/components/game.service';
import { DatetimeService } from '../../shared/services/utilities/datetime.service';
import { TimeoutService } from '../../shared/services/utilities/timeout.service';
import { DomService } from '../../shared/services/utilities/dom.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit, OnDestroy {
  private gameSubscription!: Subscription;
  private gameIsVisibleSubscription!: Subscription;
  private scoreSubscription!: Subscription;
  private meteorSubscription!: Subscription;
  private meteorIntervalSpeedSubscription!: Subscription;
  private collisionCheckSubscription!: Subscription;

  // service
  isRunning: boolean = false;
  isVisible: boolean = false;
  // game
  isInGameContainer: boolean = false;
  gameCanBeStarted: boolean = false;
  gameIsOver: boolean = false;
  // score
  score: number = 0;
  scoreMin: number = 0;
  scoreMax: number = 99999;
  highScore: number = 0;
  scoreStepIncrease: number = 50;
  storageKeyHighScore: string = LocalStorageService.portfolioPrefixStorageKey + 'player-high-score';
  storageKeyScore: string = LocalStorageService.portfolioPrefixStorageKey + 'player-score';
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
  meteorIntervalSpeedGeneration: number = 1000;

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
    this.updatePlayerHighScore();
    this.subscribeGame();
    this.subscribeGameIsVisible();
  }

  ngOnDestroy() {
    this.unsubscribeGame();
    this.unsubscribeGameIsVisible();
    this.cancelScore();
    this.cancelMeteor();
    this.stopMeteorIntervalAdjustment();
    this.stopCollisionCheck();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMoveIntoGameContainer(event: MouseEvent): void {
    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    this.isInGameContainer = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;

    if (this.isInGameContainer) {
      this.mouseIsMovingOnce = true;
      this.clientX = event.clientX;
      this.renderer.setStyle(this.gameCursor.nativeElement, 'transform', `translateX(${this.clientX}px)`);

      if (!this.isRunning && !this.gameIsOver) {
        this.startGame();
      }

    } else if (!this.isInGameContainer) {
      if (this.isRunning) {
        this.stopGame();
      }
    }
  }

  onClickQuitGame(): void {
    this.hide();
  }

  onClickRetryGame(): void {
    this.gameIsOver = false;
    this.resetGameVariables();
  }

  // sub & unsub ===================================

  // game
  subscribeGame(): void {
    this.gameSubscription = this.gameService.isRunning$.subscribe({
      next: (isRunning) => {
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
      },
      error: (e) => console.error('error gameSubscription', e)
    });
  }

  unsubscribeGame(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
  }

  // game is visible
  subscribeGameIsVisible(): void {
    this.gameIsVisibleSubscription = this.gameService.isVisible$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
        if (isVisible) {
          this.gameCanBeStarted = true;
        } else {
          this.gameCanBeStarted = false;
        }
      },
      error: (e) => console.error('error gameIsVisibleSubscription', e)
    });
  }

  unsubscribeGameIsVisible(): void {
    if (this.gameIsVisibleSubscription) {
      this.gameIsVisibleSubscription.unsubscribe();
    }
  }

  // score
  subscribeScore(timer$: Observable<number>): void {
    this.scoreSubscription = timer$.subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.updatePlayerScore();
          this.cdr.detectChanges();
        });
      },
      error: (e) => console.error('error subscribeScore', e)
    });
  }

  unsubscribeScore(): void {
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }
  }

  // meteor
  subscribeMeteor(): void {
    this.meteorSubscription = timer(0, this.meteorIntervalSpeedGeneration).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.createMeteor();
          this.cdr.detectChanges();
        });
      }
    });
  }

  unsubscribeMeteor(): void {
    if (this.meteorSubscription) {
      this.meteorSubscription.unsubscribe();
    }
  }

  // meteor speed
  subscribeMeteorSpeed(adjustInterval$: Observable<number>): void {
    this.meteorIntervalSpeedSubscription = adjustInterval$.subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.increaseSpeedMeteorInterval();
          this.cdr.detectChanges();
        });
      },
      error: (e) => console.error('error subscribeMeteorSpeed', e)
    });
  }

  unsubscribeMeteorSpeed(): void {
    if (this.meteorIntervalSpeedSubscription) {
      this.meteorIntervalSpeedSubscription.unsubscribe();
    }
  }

  // collision check
  subscribeCollisionCheck(checkInterval$: Observable<number>): void {
    this.collisionCheckSubscription = checkInterval$.subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.checkCollisions();
          this.cdr.detectChanges();
        });
      },
      error: (e) => console.error('error subscribeCollisionCheck', e)
    });
  }

  unsubscribeCollisionCheck(): void {
    if (this.collisionCheckSubscription) {
      this.collisionCheckSubscription.unsubscribe();
    }
  }

  // END sub & unsub ================================

  show(): void {
    this.gameService.show();
  }

  hide(): void {
    this.gameService.hide();
  }

  startGame(): void {
    if(this.gameCanBeStarted) {
      this.gameService.start();
    }
  }

  stopGame(): void {
    this.gameService.stop();
    this.gameIsOver = true;
    this.storePlayerScore();
    this.storePlayerHighScore();
    this.updatePlayerHighScore();
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

  get storedPlayerHighScore(): number {
    if (LocalStorageService.testIsAvailable()) {
      if(localStorage.getItem(this.storageKeyHighScore)) {
        return parseInt(localStorage.getItem(this.storageKeyHighScore)!, 10);
      } else {
        return 0;
      }
    }
    return 0;
  }

  get storedPlayerScore(): number {
    if (LocalStorageService.testIsAvailable()) {
      return parseInt(localStorage.getItem(this.storageKeyScore)!, 10);
    }
    return 0;
  }

  initScore(): void {
    this.unsubscribeScore();
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.subscribeScore(timer$);
    });
  }

  cancelScore(): void {
    this.unsubscribeScore();
  }

  updatePlayerScore(): void {
    if(this.score <= this.scoreMax) {
      this.score += this.scoreStepIncrease;
    }
  }

  updatePlayerHighScore(): void {
    this.highScore = this.storedPlayerHighScore;
  }

  storePlayerHighScore(): void {
    if (LocalStorageService.testIsAvailable()) {
      if(this.score > this.storedPlayerHighScore) {
        localStorage.setItem(this.storageKeyHighScore, JSON.stringify(this.score));
      }
    }
  }

  storePlayerScore(): void {
    if (LocalStorageService.testIsAvailable()) {
      localStorage.setItem(this.storageKeyScore, JSON.stringify(this.score));
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
    this.unsubscribeMeteor();
    this.ngZone.runOutsideAngular(() => {
      this.subscribeMeteor();
    });
  }

  cancelMeteor(): void {
    this.unsubscribeMeteor();
  }

  createMeteor(): void {
    const meteorTimestamp = DatetimeService.timestampNow;
    const gameContainer = this.gameContainer.nativeElement;
    const randomWidth = this.randomMeteorWidth;

    const meteor = this.renderer.createElement('img');
    this.renderer.setAttribute(meteor, 'src', 'assets/images/meteor.png');
    this.renderer.setAttribute(meteor, 'data-damage', this.defineMeteorDamages(randomWidth));
    this.renderer.setAttribute(meteor, 'data-timestamp', meteorTimestamp.toString());
    
    this.renderer.addClass(meteor, "meteor");
    this.renderer.addClass(meteor, "absolute");
    this.renderer.addClass(meteor, "cursor-none");
    this.renderer.addClass(meteor, `meteor-falling-animation-${this.randomMeteorClassNamesIndex}`);
   
    this.renderer.setStyle(meteor, 'left', `${this.randomMeteorLeftPosition}%`);
    this.renderer.setStyle(meteor, 'width', `${randomWidth}px`);
  
    
    this.renderer.appendChild(gameContainer, meteor);

    this.removeOldMeteors();
  }

  defineMeteorDamages(width: number): string {
    let damage: string = "0";
    if(width > 0 && width < 40) damage = "5";
    if(width >= 40 && width <= 60) damage = "10";
    if(width > 60) damage = "20";
    return damage;
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
    this.unsubscribeMeteorSpeed();
    this.ngZone.runOutsideAngular(() => {
      const adjustInterval$ = interval(3000);
      this.subscribeMeteorSpeed(adjustInterval$);
    });
  }

  stopMeteorIntervalAdjustment(): void {
    this.unsubscribeMeteorSpeed();
  }

  increaseSpeedMeteorInterval(): void {
    if (this.meteorIntervalSpeedGeneration > 100) {
      this.meteorIntervalSpeedGeneration -= 50;
      this.cancelMeteor();
      this.initMeteor();
    }
  }

  // COLLISION CHECK

  startCollisionCheck(): void {
    this.unsubscribeCollisionCheck();
    this.ngZone.runOutsideAngular(() => {
      const checkInterval$ = interval(100);
      this.subscribeCollisionCheck(checkInterval$);
    });
  }

  stopCollisionCheck(): void {
    this.unsubscribeCollisionCheck();
  }

  checkCollisions(): void {
    const collisionBox = this.collisionBox.nativeElement.getBoundingClientRect();
    const meteors = this.gameContainer.nativeElement.querySelectorAll('.meteor');
  
    meteors.forEach((meteor: Element) => {
      if (this.gameContainer.nativeElement.contains(meteor)) {
        const meteorRect = (meteor as HTMLElement).getBoundingClientRect();
        if (DomService.isColliding(collisionBox, meteorRect)) {
          const damage = meteor.getAttribute('data-damage');
          this.handleCollision(damage);
          this.renderer.removeChild(this.gameContainer.nativeElement, meteor);
        }
      }
    });
  }

  handleCollision(damage: string | null): void {
    if (damage) {
      if(parseInt(damage) > 0) {
        const thisDamage = parseInt(damage)*-1;
        this.updateHealth(thisDamage);
        this.gameCursorWasHitted();
      }
    }
  }

  gameCursorWasHitted(): void {
    this.collisionBoxIsHitted = true;
    TimeoutService.setTimeout(()=>{
      this.collisionBoxIsHitted = false;
    }, 500);
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
