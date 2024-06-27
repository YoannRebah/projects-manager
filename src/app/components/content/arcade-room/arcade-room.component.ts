import { Component, inject } from '@angular/core';
import { LoaderHourglassService } from '../../../shared/services/components/loader-hourglass.service';

@Component({
  selector: 'app-arcade-room',
  standalone: true,
  imports: [],
  templateUrl: './arcade-room.component.html',
  styleUrl: './arcade-room.component.scss'
})

export class ArcadeRoomComponent {
  loaderHourglassService = inject(LoaderHourglassService);

  constructor() {}

  onClickPressPlay(): void {
    this.loaderHourglassService.show();
  }
}