import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../shared/services/components/terminal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})

export class TerminalComponent implements OnInit, OnDestroy {
  private subscriptionIsVisible!: Subscription;
  isVisible: boolean = false;

  constructor(private terminalService: TerminalService) {}

  ngOnInit(): void {
    this.subscribeIsVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsVisible();
  }

  subscribeIsVisible(): void {
    this.subscriptionIsVisible = this.terminalService.isVisibleSubject$.subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
      error: (e) => console.error('error subscribeIsVisible', e)
    })
  }

  unsubscribeIsVisible(): void {
    if(this.subscriptionIsVisible) {
      this.subscriptionIsVisible.unsubscribe();
    }
  }

  toggleTerminalIsVisible(): void {
    this.isVisible = !this.isVisible;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownToggleTerminal(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'q') {
      event.preventDefault();
      this.toggleTerminalIsVisible();
    }
  }

}