import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { GameComponent } from '../game/game.component';
// import { GameService } from '../../../shared/services/components/game.service';

@Component({
  selector: 'app-arcade-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arcade-room.component.html',
  styleUrls: ['./arcade-room.component.scss']
})

export class ArcadeRoomComponent {
  // gameIsVisible: boolean = false;
  // gameService = inject(GameService);

  // constructor() {
  //   this.gameService.isVisible$.subscribe(isVisible => {
  //     this.gameIsVisible = isVisible;
  //   });
  // }

  // onClickShowGame(): void {
  //   this.gameService.show();
  // }

}