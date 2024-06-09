import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})

export class NavComponent {
  scrollTopPosition: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrollTopPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

}