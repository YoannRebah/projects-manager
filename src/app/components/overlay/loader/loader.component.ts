import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
  isLoading: boolean = true;
  timeoutDelay: number = 5000;

  ngOnInit(): void {
    let timeout = setTimeout(()=>{
      this.hide();
      clearTimeout(timeout);
    }, this.timeoutDelay);
  }

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }

}
