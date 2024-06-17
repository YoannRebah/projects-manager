import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h2',
  standalone: true,
  imports: [],
  templateUrl: './h2.component.html',
  styleUrl: './h2.component.scss'
})

export class H2Component {
  @Input() text?: string;
}