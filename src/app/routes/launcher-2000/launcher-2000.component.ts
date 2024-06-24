import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { GameComponent } from '../../components/content/game/game.component';
import { GameService } from '../../shared/services/components/game.service';
import { VhsEffectComponent } from '../../components/base/vhs-effect/vhs-effect.component';
import { VhsEffectService } from '../../shared/services/components/vhs-effect.service';
import { TimeoutService } from '../../shared/services/utilities/timeout.service';

@Component({
  selector: 'app-launcher-2000',
  standalone: true,
  imports: [GameComponent, VhsEffectComponent],
  templateUrl: './launcher-2000.component.html',
  styleUrl: './launcher-2000.component.scss'
})

export class Launcher2000Component implements OnInit, OnDestroy {
  gameService = inject(GameService);
  vhsEffectService = inject(VhsEffectService);

  constructor() {}

  ngOnInit(): void {
    this.gameService.show();
    TimeoutService.setTimeout(()=>{
      this.vhsEffectService.hideFooter();
    },0);
  }

  ngOnDestroy(): void {
    this.gameService.hide();
  }

}