import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block-signal-tv',
  standalone: true,
  imports: [],
  templateUrl: './block-signal-tv.component.html',
  styleUrl: './block-signal-tv.component.scss'
})

export class BlockSignalTvComponent {
  @Input() iconClassNames: string = 'fa-solid fa-satellite';
  @Input() title: string = 'Signal faible...';
  @Input() subtitle: string = 'Reprise du programme TV';
}
