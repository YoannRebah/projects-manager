import { Component, Renderer2, ElementRef, OnInit, OnDestroy, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { GameService } from '../../../shared/services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private gameSubscription!: Subscription;
  clientX: number = 0;
  keyHighScore: string = 'high-score';
  score: number = 0;
  scoreMin: number = 0;
  scoreMax: number = 99999;
  highScore: number = 0;
  scoreStepIncrease: number = 50;
  scoreIncreaseTimeoutDelay: number = 1000;
  health: number = 100;
  healthMin: number = 0;
  healthMax: number = 100;
  gameIsOver: boolean = false;
  mouseIsMoving: boolean = false;
  collisionBoxIsHitted: boolean = false;
  meteorInterval: any;
  increaseInterval: any;
  meteorsPerSecond: number = 3;

  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private gameService: GameService
  ) {}

  get playerHighScore(): number {
    if (this.isLocalStorageAvailable()) {
      return parseInt(localStorage.getItem(this.keyHighScore)!, 10);
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
    this.renderer.listen(this.gameContainer.nativeElement, 'mousemove', this.onMouseMove.bind(this));
    this.initNewGame();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
  }

  onMouseMove(event: MouseEvent): void {
    this.mouseIsMoving = true;
    this.clientX = event.clientX;
    console.log(this.clientX)
  }

  initNewGame(): void {
    this.storeDefaultHighScore();
    this.startPlayingGame();
    this.setExistingPlayerHighScore();
  }

  storeDefaultHighScore(): void {
    if (this.isLocalStorageAvailable()) {
      if(localStorage.getItem(this.keyHighScore) == null) {
        localStorage.setItem(this.keyHighScore, JSON.stringify(0));
      }
    }
  }

  startPlayingGame(): void {
    this.subscription = this.gameService.isRunning$.subscribe(
      (isRunning: boolean) => {
        if (isRunning) {
          this.initGameLogic();
        } else {
          this.pauseScoreCounter();
        }
      }
    );
    let timeout = setTimeout(() => {
      this.gameService.start();
      clearTimeout(timeout);
    }, this.scoreIncreaseTimeoutDelay);
  }

  initGameLogic(): void {
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.gameSubscription = timer$.subscribe(() => {
        this.ngZone.run(() => {
          this.updateScore();
          this.initMeteor();
          this.cdr.detectChanges();
        });
      });
    });
  }

  updateScore(): void {
    if(this.score < this.scoreMax) {
      this.score += this.scoreStepIncrease;
    } else {
      this.stopGame();
    }
  }

  stopGame(): void {
    this.updateHighScore();
    this.resetScoreCounter();
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

  resetScoreCounter(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
      this.score = this.scoreMin;
    }
  }

  setExistingPlayerHighScore(): void {
    this.highScore = this.playerHighScore;
  }

  pauseScoreCounter(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
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

  initMeteor(): void {
    this.createRandomMeteor();
    this.removeOldMeteors();
  }

  createRandomMeteor(): void {
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
    const meteors = gameContainer.getElementsByClassName('meteor');

    for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i] as HTMLElement;
        const timestamp = parseInt(meteor.getAttribute('data-timestamp') || '0', 10);
        if (this.meteorMustBeRemoved(timestamp)) {
            this.renderer.removeChild(gameContainer, meteor);
        }
    }
  }

  // meteorHitGameCursor(): void {

  // }

}
