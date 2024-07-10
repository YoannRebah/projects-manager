import { Component } from '@angular/core';
import { ScrollDownFilterDirective } from '../../../shared/directives/scroll-down-filter.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ScrollDownFilterDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  constructor() {}
}