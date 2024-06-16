import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { WindowRefService } from '../../../shared/services/utilities/window-ref.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  windowTopPosition: number = 0;
  grayscaleValue: number = 0;
  opacityValue: number = 0;

  @ViewChild('header', { static: true }) header!: ElementRef;

  constructor(private windowRefService: WindowRefService) {}

  ngOnInit(): void {
    this.windowTopPosition = this.windowRefService.windowTopPosition;
    this.setStylesValue();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.windowTopPosition = this.windowRefService.windowTopPosition;
    this.setStylesValue();
  }

  setStylesValue(): void {
    this.grayscaleValue = this.windowTopPosition / 500;
    this.opacityValue = parseFloat((1 - (this.windowTopPosition / 700)).toFixed(3));

    if(this.grayscaleValue <= 1) this.header.nativeElement.style.filter = `grayscale(${this.grayscaleValue})`;
    if(this.opacityValue >= 0) this.header.nativeElement.style.opacity = this.opacityValue;
  }
}