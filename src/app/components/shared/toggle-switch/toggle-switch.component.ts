import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToggleSwitchService } from '../../../shared/services/components/toggle-switch.service';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})

export class ToggleSwitchComponent implements OnInit, OnDestroy {
  private isCheckedSubscription!: Subscription;
  isChecked: boolean = false;

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
    });
  }

  unsubscribeIsChecked(): void {
    if (this.isCheckedSubscription) {
      this.isCheckedSubscription.unsubscribe();
    }
  }

}
