import { Component, Input, HostBinding } from '@angular/core';
import { Section } from '../../../shared/models/section';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent implements Section {
  @HostBinding('id') @Input() id?: string;
}
