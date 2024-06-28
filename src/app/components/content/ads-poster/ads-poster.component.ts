import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ads-poster',
  standalone: true,
  imports: [],
  templateUrl: './ads-poster.component.html',
  styleUrl: './ads-poster.component.scss'
})

export class AdsPosterComponent {
  @Input() imgPath?: string;
}
