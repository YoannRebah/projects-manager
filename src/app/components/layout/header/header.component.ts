import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { WindowRefService } from '../../../shared/services/window-ref.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  windowTopPosition: number = 0;
  filterValue: number = 0;

  @ViewChild('header', { static: true }) header!: ElementRef;

  constructor(private windowRefService: WindowRefService) {}

  ngOnInit(): void {
    this.windowTopPosition = this.windowRefService.windowTopPosition;
    this.setGrayscaleStyleValue();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.windowTopPosition = this.windowRefService.windowTopPosition;
    this.setGrayscaleStyleValue();
  }

  setGrayscaleStyleValue(): void {
    this.filterValue = this.windowTopPosition / 500;
    if(this.filterValue <= 1) {
      this.header.nativeElement.style.filter = `grayscale(${this.filterValue})`;
    }
  }
}