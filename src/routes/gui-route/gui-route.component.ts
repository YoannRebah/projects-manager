import { Component } from '@angular/core';
import { GuiComponent } from '../../components/routes/gui/gui.component';

@Component({
  selector: 'app-gui-route',
  standalone: true,
  imports: [
    GuiComponent
  ],
  templateUrl: './gui-route.component.html',
  styleUrl: './gui-route.component.scss'
})

export class GuiRouteComponent {
  constructor() {}
}