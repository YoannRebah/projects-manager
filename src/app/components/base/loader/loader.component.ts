import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../shared/services/components/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
  private loaderSubscription!: Subscription;
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {}

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