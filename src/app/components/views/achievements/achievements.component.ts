import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnTab, Column } from '../../../shared/models/achievements';
import { PopinComponent } from '../../shared/popin/popin.component';
import { PopinService } from '../../../shared/services/components/popin.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, PopinComponent],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})

export class AchievementsComponent {
  activeIndex: number = 0;
  indexMin: number = 0;
  indexMax: number = 3;
  btnTabs: BtnTab[] = [
    { text: "Lorem", index: 0 },
    { text: "Lorem", index: 1 },
    { text: "Lorem", index: 2 },
    { text: "Lorem", index: 3 }
  ];
  columns: Column[] = [
    {
      index: 0,
      img: {
        path: "assets/gif/achievements-1.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Lorem ipsum dolor 1 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 1 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 1 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        }
      ]
    },
    {
      index: 1,
      img: {
        path: "assets/gif/achievements-2.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Lorem ipsum dolor 2 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 2 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 2 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        }
      ]
    },
    {
      index: 2,
      img: {
        path: "assets/gif/achievements-3.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Lorem ipsum dolor 3 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 3 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 3 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        }
      ]
    },
    {
      index: 3,
      img: {
        path: "assets/gif/achievements-5.gif",
        alt: ""
      },
      blockDetails: [
        {
          title: "Lorem ipsum dolor 4 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 4 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        },
        {
          title: "Lorem ipsum dolor 4 :",
          list: [
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet.",
            "Lorem ipsum dolor, sit amet."
          ]
        }
      ]
    }
  ];

  constructor(private popinService: PopinService) {}

  setActive(index: number): void {
    this.activeIndex = index;
  }

  triggerPrev(): void {
    if(this.activeIndex > this.indexMin) {
      this.activeIndex--
    } else {
      this.activeIndex = this.indexMax
    }
  }

  triggerNext(): void {
    if(this.activeIndex < this.indexMax) {
      this.activeIndex++
    } else {
      this.activeIndex = this.indexMin
    }
  }

  showPopin(): void {
    this.popinService.show();
  }

}