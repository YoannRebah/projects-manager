import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleSwitchService } from '../../../shared/services/components/toggle-switch.service';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})

export class ToggleSwitchComponent implements OnInit {
  @Input() id!: string;
  @Input() label!: string;
  @Output() stateChanged = new EventEmitter<boolean>();
  isChecked: boolean = false;

  constructor(private toggleSwitchService: ToggleSwitchService) {}

  ngOnInit(): void {
    this.isChecked = this.toggleSwitchService.getState(this.id);
  }

  toggle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.isChecked = target.checked;
    this.stateChanged.emit(this.isChecked);
    if (this.isChecked) {
      this.toggleSwitchService.check(this.id);
    } else {
      this.toggleSwitchService.uncheck(this.id);
    }
  }

}
