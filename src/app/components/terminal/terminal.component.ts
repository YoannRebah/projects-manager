import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../shared/services/components/terminal.service';
import { Subscription } from 'rxjs';
import { TimeoutService } from '../../shared/services/utilities/timeout.service';
import { LoaderService } from '../../shared/services/components/loader.service';

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
  inputCommandValue!: string

  @ViewChild('terminalList', { static: false }) terminalList!: ElementRef;

  constructor(
    private terminalService: TerminalService,
    private renderer: Renderer2,
    private loaderService: LoaderService
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

  onPressKeyCtrlQ(): void {
    this.toggleTerminalIsVisible();
    TimeoutService.setTimeout(()=>{
      this.createRowTerminal();
    }, 150);
  }

  onPressKeyEnter(): void {
    this.disablePreviousInputs();
    if(this.inputCommandValue) {
      this.execCommandLine();
      this.createRowTerminal();
    } else {
      this.createRowTerminal();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownTerminal(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'q') {
      event.preventDefault();
      this.onPressKeyCtrlQ();
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onPressKeyEnter();
    }
  }

  createRowTerminal(): void {
    if(this.isVisible) {
      const terminalList = this.terminalList.nativeElement;
  
      const rowTerminal = this.renderer.createElement('li');
      this.renderer.addClass(rowTerminal, 'row-terminal');
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
        this.renderer.listen(input, 'input', (e) => { this.inputCommandValue = e.target.value; })
      }
    }
  }

  disablePreviousInputs(): void {
    const previousRows = document.querySelectorAll('.row-terminal');
    previousRows.forEach((elem: Element) => {
      const input = elem.querySelector('input');
      if (input) input.disabled = true;
    });
  }

  execCommandLine(): void {
    if(this.inputCommandValue) {
      const command = this.inputCommandValue;
      switch(command) {
        case 'show loader': this.loaderService.show();
        break;
        case 'hide loader': this.loaderService.hide();
        break;
        case 'toggle loader': this.loaderService.toggle();
        break;
      }
    }
  }

}