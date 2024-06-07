import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { H2 } from '../../../models/h2';

@Component({
  selector: 'app-h2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './h2.component.html',
  styleUrls: ['./h2.component.scss']
})

export class H2Component implements H2 {
  @HostBinding('html') @Input() html?: string;
}
