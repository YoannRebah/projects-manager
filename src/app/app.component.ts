import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderHourglassComponent } from './components/base/loader-hourglass/loader-hourglass.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderHourglassComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor() {}

}