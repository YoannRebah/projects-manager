import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
  private loaderSubscription!: Subscription;
  isLoading: boolean = false;
  loaderService = inject(LoaderService);

  constructor() {}

  ngOnInit(): void {
    this.subscribeLoader();
  }

  ngOnDestroy(): void {
    this.unsubscribeLoader();
  }

  subscribeLoader(): void {
    this.loaderSubscription = this.loaderService.isLoading$.subscribe({
      next: (isLoading: boolean) => this.isLoading = isLoading,
      error: (e) => console.error('erreur loaderSubscription', e)
    });
  }

  unsubscribeLoader(): void {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

}