import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../base/modal/modal.component';
import { TerminalService } from '../../../shared/services/components/terminal.service';

@Component({
  selector: 'app-modal-terminal-help',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './modal-terminal-help.component.html',
  styleUrl: './modal-terminal-help.component.scss'
})

export class ModalTerminalHelpComponent {
  enabledCommands: string [] = TerminalService.enabledCommands;
}
