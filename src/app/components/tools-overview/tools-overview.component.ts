import { Component } from '@angular/core';
import { Tools } from '../../models/tools';

@Component({
  selector: 'app-tools-overview',
  templateUrl: './tools-overview.component.html',
  styleUrl: './tools-overview.component.scss',
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
