import { Component, OnInit, inject } from '@angular/core';
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

export class Launcher2000Component implements OnInit {
  vhsEffectService = inject(VhsEffectService);

  constructor() {}

  ngOnInit(): void {
    TimeoutService.setTimeout(()=>{
      this.vhsEffectService.hideFooter();
    },50);
  }

}