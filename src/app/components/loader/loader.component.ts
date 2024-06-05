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
    this.Show();
    let timeout = setTimeout(()=>{
      this.Hide();
      clearTimeout(timeout);
    }, this.timeoutDelay);
  }

  Show() {
    this.isLoading = true;
  }

  Hide() {
    this.isLoading = false;
  }

}
