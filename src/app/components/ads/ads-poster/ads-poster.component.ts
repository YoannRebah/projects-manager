import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ads-poster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ads-poster.component.html',
  styleUrls: ['./ads-poster.component.scss']
})

export class AdsPosterComponent {
  @Input() imgPath?: string;
}
