import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeoutService } from '../../../services/timeout.service';

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
    TimeoutService.setTimeout(()=>{
      this.loadingSubject.next(false);
    }, 2000);
  }

}