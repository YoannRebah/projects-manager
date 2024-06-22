import { Component } from '@angular/core';
import { ScrollDownFadeDirective } from '../../../shared/directives/scroll-down-fade.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ScrollDownFadeDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent {
  constructor() {}
}