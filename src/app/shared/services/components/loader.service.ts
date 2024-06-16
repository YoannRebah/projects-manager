import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeoutService } from '../utilities/timeout.service';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  constructor() { }

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }

  toggle(): void {
    this.show();
    TimeoutService.setTimeout(()=>{
      this.hide();
    });
  }
}