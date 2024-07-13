import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LoaderComponent } from '../components/base/loader/loader.component';
import { LoaderService } from '../components/base/loader/loader.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';
import { TimeoutService } from '../services/timeout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  loaderService = inject(LoaderService);
  router = inject(Router);
  authService = inject(AuthService);
  isAuthenticated: boolean = false;
  userName!: string;

  constructor() {}

  ngOnInit(): void {
    TimeoutService.setTimeout(()=>{
      this.userIsAuthenticated();
      this.loaderService.hide();
    }, 2000);
  }

  userIsAuthenticated(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.user$.subscribe((user: User) => {
      if(user) {
        this.isAuthenticated = !!user;
        this.userName = user.username;
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}