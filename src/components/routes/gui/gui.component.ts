import { Component, ViewChild } from '@angular/core';
import { ToggleSwitchComponent } from '../../base/toggle-switch/toggle-switch.component';

@Component({
  selector: 'app-gui',
  standalone: true,
  imports: [
    ToggleSwitchComponent
  ],
  templateUrl: './gui.component.html',
  styleUrl: './gui.component.scss'
})

export class GuiComponent {
  constructor() {}

  // TOGGLE SWITCH =============================================================

  @ViewChild('toggleSwitchGui') toggleSwitchGui!: ToggleSwitchComponent;

  onStateChanged(newState: boolean, id: string): void {
    if(id === 'gui-toggle-switch') {
      if(newState) {
        console.log('on');
      } else {
        console.log('off');
      }
    }
  }

  setToggleSwitchGuiState(newState: boolean): void {
    if (this.toggleSwitchGui) {
      this.toggleSwitchGui.checkboxState = newState;
    }
  }

  // END TOGGLE SWITCH ===========================================================

}
