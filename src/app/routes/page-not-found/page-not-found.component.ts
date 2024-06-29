import { Component } from '@angular/core';
import { BlockSignalTvComponent } from '../../components/base/block-signal-tv/block-signal-tv.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [BlockSignalTvComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})

export class PageNotFoundComponent {

}
