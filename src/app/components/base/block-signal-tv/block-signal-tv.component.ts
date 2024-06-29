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
  @Input() headerTitle: string = 'Signal faible...';
  @Input() subtitle: string = 'Reprise du programme TV';
  @Input() linkHref!: string;
  @Input() linkText!: string;

  linkIsDisplayed(): boolean {
    return this.linkHref != null && this.linkText != null;
  }
}
