import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../../shared/services/components/modal.service';

@Component({
  selector: 'app-modal-settings',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './modal-settings.component.html',
  styleUrl: './modal-settings.component.scss'
})

export class ModalSettingsComponent {

  constructor(
    private modalService: ModalService
  ) {}
  
}
