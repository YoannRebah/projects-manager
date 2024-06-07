import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tools } from '../../../models/tools';

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
      id: "vs-code",
      toolName: 'VS Code',
      animationDelay: '10s',
    },
    {
      id: "vs",
      toolName: 'Visual Studio',
      animationDelay: '2.2s',
    },
    {
      id: "figma",
      toolName: 'Figma',
      animationDelay: '8s',
    },
    {
      id: "git",
      toolName: 'Git',
      animationDelay: '4.5s',
    },
    {
      id: "aem",
      toolName: 'AEM',
      animationDelay: '1s',
    },
    {
      id: "wordpress",
      toolName: 'Wordpress',
      animationDelay: '3.8s',
    },
  ];
}