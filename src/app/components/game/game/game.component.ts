import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
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
  // service
  isRunning: boolean = false;
  private gameSubscription!: Subscription;
  private scoreSubscription!: Subscription;
  private meteorSubscription!: Subscription;

  // score
  score: number = 0;
  scoreMin: number = 0;
  scoreMax: number = 99999;
  highScore: number = 0;
  scoreStepIncrease: number = 50;

  // health
  health: number = 100;
  healthMin: number = 0;
  healthMax: number = 100;

  // mouse
  mouseIsMovingOnce: boolean = false;
  clientX: number = 0;

  // collision box
  collisionBoxIsHitted: boolean = false;

  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.gameSubscription = this.gameService.isRunning$.subscribe(isRunning => {
      this.isRunning = isRunning;
      if (isRunning) {
        this.initScore();
        this.initMeteor();
      } else {
        this.pauseScore();
        this.pauseMeteor();
      }
    });
  }

  ngOnDestroy() {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    this.pauseScore();
    this.pauseMeteor();
  }

  // GAME SERVICE

  startGame() {
    this.gameService.start();
  }

  pauseGame() {
    this.gameService.pause();
  }

  stopGame() {
    this.gameService.stop();
  }

  // GAME

  resetGame(): void {
    this.score = this.scoreMin;
    this.health = this.healthMax;
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
          this.updateScore();
          this.cdr.detectChanges();
        });
      });
    });
  }

  pauseScore(): void {
    if (this.scoreSubscription) {
      this.scoreSubscription.unsubscribe();
    }
  }

  updateScore(): void {
    if(this.score <= this.scoreMax) {
      this.score += this.scoreStepIncrease;
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
      const timer$ = interval(1000);
      this.meteorSubscription = timer$.subscribe(() => {
        this.ngZone.run(() => {
          this.createMeteor();
          this.cdr.detectChanges();
        });
      });
    });
  }

  pauseMeteor(): void {
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
    const meteors = gameContainer.getElementsByClassName('meteor');

    for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i] as HTMLElement;
        const timestamp = parseInt(meteor.getAttribute('data-timestamp') || '0', 10);
        if (this.meteorMustBeRemoved(timestamp)) {
            this.renderer.removeChild(gameContainer, meteor);
        }
    }
  }

  // MOUSE

  @HostListener('document:mousemove', ['$event'])
  onMouseMoveIntoGameContainer(event: MouseEvent): void {
    const rect = this.gameContainer.nativeElement.getBoundingClientRect();
    const isInGameContainer = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;

    if (isInGameContainer) {
      this.mouseIsMovingOnce = true;
      this.clientX = event.clientX;

      if (!this.isRunning) {
        this.startGame();
      }

    } else if (!isInGameContainer) {
      if (this.isRunning) {
        this.pauseGame();
      }
    }
  }

  // BTN ACTIONS

  onClickStop(event: MouseEvent): void {
    this.stopGame();
  }

  onClickQuit(event: MouseEvent): void {
    // Handle quit action
  }

  onClickPause(event: MouseEvent): void {
    this.pauseGame();
  }

}
