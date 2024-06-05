import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})

export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  timeoutDelay: number = 5000;

  ngOnInit(): void {
    this.show();
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
