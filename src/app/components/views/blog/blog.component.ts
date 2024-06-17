import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})

export class BlogComponent implements OnInit, OnDestroy {
  activeIndex: number = 0;
  indexMin: number = 0;
  cardGroups = [
    [
      {
        h2: "Tout savoir sur le pourquoi du comment avec qui. 1",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum placeat quisquam sequi culpa, debitis.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      },
      {
        h2: "Tout savoir sur le pourquoi. 1",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      },
      {
        h2: "Tout savoir sur le pourquoi du comment. 1",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum placeat quisquam sequi culpa, debitis. Magnam ipsum placeat quisquam.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      }
    ],
    [
      {
        h2: "Tout savoir sur le pourquoi du comment avec qui. 2",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum placeat quisquam sequi culpa, debitis.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      },
      {
        h2: "Tout savoir sur le pourquoi. 2",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      },
      {
        h2: "Tout savoir sur le pourquoi du comment. 2",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum placeat quisquam sequi culpa, debitis. Magnam ipsum placeat quisquam.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      }
    ],
    [
      {
        h2: "Tout savoir sur le pourquoi du comment avec qui. 3",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum placeat quisquam sequi culpa, debitis.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      },
      {
        h2: "Tout savoir sur le pourquoi. 3",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      },
      {
        h2: "Tout savoir sur le pourquoi du comment. 3",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum placeat quisquam sequi culpa, debitis. Magnam ipsum placeat quisquam.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      }
    ],
    [
      {
        h2: "Tout savoir sur le pourquoi du comment avec qui. 4",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam ipsum placeat quisquam sequi culpa, debitis.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      },
      {
        h2: "Tout savoir sur le pourquoi. 4",
        p: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        a: {
          href: "/lorem",
          ariaLabel: "Lorem"
        }
      }
    ]
  ];
  indexMax: number = this.cardGroups.length - 1;

  constructor() {}

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  onClickPrev(): void {
    if(this.activeIndex > this.indexMin) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.indexMax;
    }
    console.log(this.activeIndex)
  }

  onClickNext(): void {
    if(this.activeIndex < this.indexMax) {
      this.activeIndex++;
    } else {
      this.activeIndex = this.indexMin;
    }
    console.log(this.activeIndex)
  }
}
