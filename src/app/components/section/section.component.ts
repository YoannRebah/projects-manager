import { Component, Input, HostBinding } from '@angular/core';
import { Section } from '../../models/section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})

export class SectionComponent implements Section {
  @HostBinding('id') @Input() id?: string;
}
