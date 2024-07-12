import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, inject } from '@angular/core';
import { InputService } from '../../../services/input.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent implements OnInit, OnDestroy {
  private inputStateSubscription!: Subscription;
  inputService = inject(InputService);

  @Input() id!: string;
  @Input() label!: string;
  @Output() stateChanged = new EventEmitter<boolean>();

  checkboxState: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.subscribeInputState();
  }

  ngOnDestroy(): void {
    this.unsubscribeInputState();
  }

  subscribeInputState(): void {
    if (this.id) {
      this.inputStateSubscription = this.inputService.getInputState(this.id).subscribe({
        next: (state) => {
          this.checkboxState = state;
        },
        error: (e) => console.error('error subscribeInputState', e)
      });
    }
  }

  unsubscribeInputState(): void {
    if (this.inputStateSubscription) {
      this.inputStateSubscription.unsubscribe();
    }
  }

  toggleCheckbox(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputService.setInputState(this.id, input.checked);
    this.stateChanged.emit(input.checked);
  }
}
