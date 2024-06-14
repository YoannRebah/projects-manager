import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../../game/game/game.component';
import { GameService } from '../../../shared/services/components/game.service';

@Component({
  selector: 'app-arcade-room',
  standalone: true,
  imports: [CommonModule, GameComponent],
  templateUrl: './arcade-room.component.html',
  styleUrls: ['./arcade-room.component.scss']
})

export class ArcadeRoomComponent {

  gameIsVisible: boolean = false;

  constructor(private gameService: GameService) {
    this.gameService.isVisible$.subscribe(isVisible => {
      this.gameIsVisible = isVisible;
    });
  }

  showGameComponent(): void {
    this.gameService.show();
  }

}