import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tools } from '../../../shared/models/tools';

@Component({
  selector: 'app-tools-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tools-overview.component.html',
  styleUrls: ['./tools-overview.component.scss'],
})

export class ToolsOverviewComponent {
  tools: Tools[] = [
    {
      id: 'vs-code',
      text: 'VS Code',
      bgImage: 'assets/images/logo-vs-code.png'
    },
    {
      id: 'vs',
      text: 'Visual Studio',
      bgImage: 'assets/images/logo-vs.png'
    },
    {
      id: 'figma',
      text: 'Figma',
      bgImage: 'assets/images/logo-figma.png'
    },
    {
      id: 'git',
      text: 'Git',
      bgImage: 'assets/images/logo-git.png'
    },
    {
      id: 'aem',
      text: 'AEM',
      bgImage: 'assets/images/logo-aem.png'
    },
    {
      id: 'wordpress',
      text: 'Wordpress',
      bgImage: 'assets/images/logo-wordpress.png'
    },
  ];
}