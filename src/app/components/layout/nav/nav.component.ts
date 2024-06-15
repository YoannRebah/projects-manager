import { Component, HostListener, OnInit } from '@angular/core';
import { WindowRefService } from '../../../shared/services/window-ref.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent implements OnInit {
  windowTopPosition: number = 0;

  constructor(private windowRefService: WindowRefService) {}

  ngOnInit(): void {
    this.windowTopPosition = this.windowRefService.windowTopPosition;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.windowTopPosition = this.windowRefService.windowTopPosition;
  }

}