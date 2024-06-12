import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  private loaderSubscription!: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscribeToLoader();
  }

  ngOnDestroy(): void {
    this.unsubscribeToLoader();
  }

  subscribeToLoader(): void {
    this.loaderSubscription = this.loaderService.isLoading$.subscribe({
      next: (isLoading) => this.isLoading = isLoading,
      error: (error) => console.error('erreur lors de la souscription à loaderSubscription', error)
    });
  }

  unsubscribeToLoader(): void {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

}