import { Component } from '@angular/core';
import { GameLauncher2000Component } from '../../components/content/game-launcher-2000/game-launcher-2000.component';
import { VhsEffectComponent } from '../../components/base/vhs-effect/vhs-effect.component';

@Component({
  selector: 'app-launcher-2000',
  standalone: true,
  imports: [GameLauncher2000Component, VhsEffectComponent],
  templateUrl: './launcher-2000.component.html',
  styleUrl: './launcher-2000.component.scss'
})

export class Launcher2000Component {
  constructor() {}
}