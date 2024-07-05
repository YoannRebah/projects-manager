import { Component } from '@angular/core';
// content
import { Launcher2000ContentComponent } from '../../components/content/launcher-2000-content/launcher-2000-content.component';

@Component({
  selector: 'app-launcher-2000',
  standalone: true,
  imports: [
    Launcher2000ContentComponent
  ],
  templateUrl: './launcher-2000.component.html',
  styleUrl: './launcher-2000.component.scss'
})

export class Launcher2000Component {
  constructor() {}
}