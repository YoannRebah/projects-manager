import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// import { GameComponent } from '../../components/content/game/game.component';
// import { GameService } from '../../shared/services/components/game.service';
import { GameLauncher2000Component } from '../../components/content/game-launcher-2000/game-launcher-2000.component';
import { VhsEffectComponent } from '../../components/base/vhs-effect/vhs-effect.component';
import { VhsEffectService } from '../../shared/services/components/vhs-effect.service';
import { TimeoutService } from '../../shared/services/utilities/timeout.service';

@Component({
  selector: 'app-launcher-2000',
  standalone: true,
  imports: [GameLauncher2000Component, VhsEffectComponent],
  templateUrl: './launcher-2000.component.html',
  styleUrl: './launcher-2000.component.scss'
})

export class Launcher2000Component implements OnInit, OnDestroy {
  vhsEffectService = inject(VhsEffectService);

  constructor() {}

  ngOnInit(): void {
    TimeoutService.setTimeout(()=>{
      this.vhsEffectService.hideFooter();
    },0);
  }

  ngOnDestroy(): void {
    
  }

}