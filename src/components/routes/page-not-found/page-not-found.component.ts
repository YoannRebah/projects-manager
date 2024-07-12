import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})

export class PageNotFoundComponent {

  router = inject(Router);
  authService = inject(AuthService);
  isAuthenticated: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.userIsAuthenticated();
  }

  userIsAuthenticated(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.authService.user$.subscribe((user: User) => {
      if(user) {
        this.isAuthenticated = !!user;
      }
    });
  }

}