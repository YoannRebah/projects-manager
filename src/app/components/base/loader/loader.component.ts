import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from '../../../shared/services/components/loader.service';
import { Subscription } from 'rxjs';
import { BlockSignalTvComponent } from '../block-signal-tv/block-signal-tv.component';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [BlockSignalTvComponent],
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