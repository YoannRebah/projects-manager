import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../../models/section';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})

export class SectionComponent implements Section {
  @HostBinding('id') @Input() id?: string;
}
