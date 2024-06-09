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

  @ViewChild('gameContainer') gameContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.initNewGame();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
  }

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
          this.startScoreCounter();
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

  startScoreCounter(): void {
    this.ngZone.runOutsideAngular(() => {
      const timer$ = interval(1000);
      this.gameSubscription = timer$.subscribe(() => {
        this.ngZone.run(() => {
          this.updateScore();
          this.createRandomMeteor();
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

  createRandomMeteor(): void {
    const gameContainer = this.gameContainer.nativeElement;
    const meteor = this.renderer.createElement('img');
    this.renderer.setAttribute(meteor, 'src', 'assets/images/meteor.png');
    this.renderer.addClass(meteor, "meteor");
    this.renderer.addClass(meteor, `meteor-falling-animation-${this.randomMeteorClassNamesIndex}`);
    this.renderer.setStyle(meteor, 'left', `${this.randomMeteorLeftPosition}%`);
    this.renderer.setStyle(meteor, 'width', `${this.randomMeteorWidth}px`);
    this.renderer.appendChild(gameContainer, meteor);
  }

  startCreatingMeteors(): void {
    this.ngZone.runOutsideAngular(() => {
      this.meteorInterval = setInterval(() => {
        for (let i = 0; i < this.meteorsPerSecond; i++) {
          this.createRandomMeteor();
        }
      }, 1000);
    });
  }

}
