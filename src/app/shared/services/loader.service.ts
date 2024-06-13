import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }

  toggle(): void {
    this.show();
    UtilitiesService.commonTimeout(()=>{
      this.hide();
    });
  }
}