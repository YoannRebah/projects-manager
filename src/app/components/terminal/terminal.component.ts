import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../shared/services/components/terminal.service';
import { Subscription } from 'rxjs';
import { DatetimeService } from '../../shared/services/utilities/datetime.service';
import { TimeoutService } from '../../shared/services/utilities/timeout.service';

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

  @ViewChild('terminalList', { static: false }) terminalList!: ElementRef;

  constructor(
    private terminalService: TerminalService,
    private renderer: Renderer2
  ) {}

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
  handleKeyDownTerminal(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'q') {
      event.preventDefault();
      this.toggleTerminalIsVisible();
      TimeoutService.setTimeout(()=>{
        this.createRowTerminal();
      }, 150);
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.createRowTerminal();
    }
  }

  createRowTerminal(inputValue?: string): void {
    if(this.isVisible) {
      const rowTerminalTimestamp = DatetimeService.timestampNow;
      const terminalList = this.terminalList.nativeElement;
  
      const rowTerminal = this.renderer.createElement('li');
      const p = this.renderer.createElement('p');
      const span = this.renderer.createElement('span');
      const input = this.renderer.createElement('input');
  
      this.renderer.appendChild(p, this.renderer.createText("yoann@portfolio:"));
      this.renderer.appendChild(span, this.renderer.createText("~#"));
  
      this.renderer.appendChild(p, span);
      this.renderer.appendChild(rowTerminal, p);
      this.renderer.appendChild(rowTerminal, input);
  
      if (terminalList) {
        this.renderer.appendChild(terminalList, rowTerminal);
        input.focus();
      }
    }
  }

}