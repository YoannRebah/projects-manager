import { Component, Input, HostBinding } from '@angular/core';
import { H2 } from '../../models/h2';

@Component({
  selector: 'app-h2',
  templateUrl: './h2.component.html',
  styleUrl: './h2.component.scss'
})

export class H2Component implements H2 {
  @HostBinding('html') @Input() html?: string;
}
