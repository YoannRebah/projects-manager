import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalService } from '../../shared/services/components/terminal.service';
import { Subscription } from 'rxjs';
import { TimeoutService } from '../../shared/services/utilities/timeout.service';
import { LocalStorageService } from '../../shared/services/utilities/local-storage.service';
// testable services
import { LoaderService } from '../../shared/services/components/loader.service';
import { TvProgramService } from '../../shared/services/components/tv-program.service';
import { VhsEffectService } from '../../shared/services/components/vhs-effect.service';

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
  inputCommandValue!: string;
  inputCommandIsFocused: boolean = false;
  commandsHistory: string[] = [];
  terminalHistoryKey: string = LocalStorageService.portfolioPrefixStorageKey + "terminal-history";
  currentCommandIndex: number = -1;
  idToggleVhsEffect: string = 'toggle-vhs-effect';

  @ViewChild('terminalList', { static: false }) terminalList!: ElementRef;

  constructor(
    private terminalService: TerminalService,
    private renderer: Renderer2,
    private loaderService: LoaderService,
    private tvProgramService: TvProgramService,
    private vhsEffectService: VhsEffectService
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
    if(this.inputCommandIsFocused) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.onPressKeyEnter();
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.navigateHistory('up');
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.navigateHistory('down'); 
      }
    }
  }

  createRowTerminal(): void {
    if(this.isVisible) {
      const terminalList = this.terminalList.nativeElement;
  
      const rowTerminal = this.renderer.createElement('li');
      this.renderer.addClass(rowTerminal, 'row-terminal');
      this.renderer.addClass(rowTerminal, 'flex');
      this.renderer.addClass(rowTerminal, 'items-center');
      
      const p = this.renderer.createElement('p');
      this.renderer.addClass(p, 'relative');
      this.renderer.addClass(p, 'mr-2');
      this.renderer.addClass(p, 'text-green');
      
      const spanRoot = this.renderer.createElement('span');
      this.renderer.addClass(spanRoot, 'span-root');
      this.renderer.addClass(spanRoot, 'text-white');
      
      const spanCaret = this.renderer.createElement('span');
      this.renderer.addClass(spanCaret, 'span-caret');
      this.renderer.addClass(spanCaret, 'absolute');
      this.renderer.addClass(spanCaret, 'translate-x-y');
      this.renderer.addClass(spanCaret, 'top-[50%]');
      this.renderer.addClass(spanCaret, 'right-[-14%]');
      this.renderer.addClass(spanCaret, 'h-[90%]');
      this.renderer.addClass(spanCaret, 'w-[10px]');
      this.renderer.addClass(spanCaret, 'pointer-events-none');
      this.renderer.addClass(spanCaret, 'bg-pink');
      this.renderer.addClass(spanCaret, 'border-2');
      this.renderer.addClass(spanCaret, 'border-pink-dark');
      this.renderer.addClass(spanCaret, 'display-none');
      this.renderer.addClass(spanCaret, 'flash-animation');
      
      const input = this.renderer.createElement('input');
      this.renderer.setAttribute(input, 'spellcheck', 'false');
      this.renderer.addClass(input, 'w-full');
      this.renderer.addClass(input, 'text-white');
      this.renderer.addClass(input, 'bg-transparent');
      this.renderer.addClass(input, 'border-none');
      this.renderer.addClass(input, 'outline-none');
      this.renderer.addClass(input, 'font-medium');
  
      this.renderer.appendChild(p, this.renderer.createText("yoann@portfolio:"));
      this.renderer.appendChild(spanRoot, this.renderer.createText("~#"));
  
      this.renderer.appendChild(p, spanRoot);
      this.renderer.appendChild(p, spanCaret);
      this.renderer.appendChild(rowTerminal, p);
      this.renderer.appendChild(rowTerminal, input);
  
      if (terminalList) {
        this.renderer.appendChild(terminalList, rowTerminal);
        input.focus();
        this.inputCommandIsFocused = true;
        this.addEventsInput(input, spanCaret);
      }
    }
  }

  addEventsInput(input: HTMLInputElement, spanCaret: HTMLSpanElement): void {
    this.renderer.listen(input, 'focus', () => { 
      this.inputCommandIsFocused = true;
      this.renderer.addClass(spanCaret, 'display-none');
    });

    this.renderer.listen(input, 'blur', (e) => { 
      if(!input.disabled && !e.target.value) {
        this.inputCommandIsFocused = false;
        this.renderer.removeClass(spanCaret, 'display-none'); 
      }
    });

    this.renderer.listen(input, 'input', (e) => { 
      this.inputCommandValue = e.target.value; 
    });
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
      this.updateCommandsHistory(command);
      this.commandsLine(command);
    }
  }

  commandsLine(command: string): void {
    switch(command) {
      case 'show loader': this.loaderService.show();
      break;
      case 'hide loader': this.loaderService.hide();
      break;
      case 'toggle loader': this.loaderService.toggle();
      break;
      case 'show tv': this.tvProgramService.show();
      break;
      case 'hide tv': this.tvProgramService.hide();
      break;
      case 'play tv': this.tvProgramService.play();
      break;
      case 'stop tv': this.tvProgramService.stop();
      break;
      case 'show vhs': {
        this.vhsEffectService.show();
        this.vhsEffectService.showFooter();
      }
      break;
      case 'hide vhs': {
        this.vhsEffectService.hide();
        this.vhsEffectService.hideFooter();
      }
      break;
    }
  }

  updateCommandsHistory(command: string): void {
    if(!this.commandsHistory.includes(command)) {
      this.commandsHistory.push(command);

      if(LocalStorageService.testIsAvailable()) {
        const commandsHistoryStringify = JSON.stringify(this.commandsHistory);
        localStorage.setItem(this.terminalHistoryKey, commandsHistoryStringify);
      }
    }
  }

  get storedCommandsHistory(): string[] {
    const storedHistory = localStorage.getItem(this.terminalHistoryKey);
    return storedHistory ? JSON.parse(storedHistory) : [];
  }

  navigateHistory(direction: 'up' | 'down'): void {
    if (this.commandsHistory.length === 0) {
      return;
    }

    if (direction === 'up') {
      if (this.currentCommandIndex === -1) {
        this.currentCommandIndex = this.commandsHistory.length - 1;
      } else if (this.currentCommandIndex > 0) {
        this.currentCommandIndex--;
      }
    } else if (direction === 'down') {
      if (this.currentCommandIndex === -1 || this.currentCommandIndex < this.commandsHistory.length - 1) {
        this.currentCommandIndex++;
      }
    }

    this.inputCommandValue = this.commandsHistory[this.currentCommandIndex] || '';
    this.setInputWithCommandsHistory();
  }

  setInputWithCommandsHistory(): void {
    const rowTerminals = this.terminalList.nativeElement.querySelectorAll('.row-terminal');
    for (let i = 0; i < rowTerminals.length; i++) {
      const inputElement = rowTerminals[i].querySelector('input');
      if (inputElement && !inputElement.disabled) {
        inputElement.value = this.inputCommandValue;
        break;
      }
    }
  }

}