import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { ToggleSwitchService } from '../../../shared/services/components/toggle-switch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent implements OnInit, OnDestroy {
  private isCheckedSubscription!: Subscription;
  state!: boolean;
  isChecked!: boolean;

  @Input() id!: string;

  constructor(
    private toggleSwitchService: ToggleSwitchService
  ) {}

  ngOnInit(): void {
    this.subscribeIsChecked();
  }

  ngOnDestroy(): void {
    this.unsubscribeIsChecked();
  }

  subscribeIsChecked(): void {
    this.isCheckedSubscription = this.toggleSwitchService.isChecked$(this.id!).subscribe({
      next: (isChecked) => {
        this.isChecked = isChecked;
      },
      error: (e) => console.error('error subscribeIsChecked', e)
    })
  }

  unsubscribeIsChecked(): void {
    if(this.isCheckedSubscription) {
      this.isCheckedSubscription.unsubscribe();
    }
  }

  check(): void {
    if(this.id) {
      this.toggleSwitchService.check(this.id!);
    }
  }

  uncheck(): void {
    if(this.id) {
      this.toggleSwitchService.uncheck(this.id!);
    }
  }

  toggleSwitch(Event: Event): void {
    const inputElement = (Event.target as HTMLInputElement);
    if(inputElement.checked) {
      this.check();
    } else {
      this.uncheck();
    }
  }

  getCurrentState() {
    return this.toggleSwitchService.isChecked$(this.id!);
  }

}
