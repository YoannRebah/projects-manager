import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorLogin!: boolean;
  userAlreadyLogged!: boolean;
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.checkUserConnectionStatus();
    this.initFormControl();
  }

  checkUserConnectionStatus(): void {
    this.authService.user$.subscribe((user: { email: string; displayName: string; }) => {
      if(user) {
        if(user.email && user.displayName) {
          this.router.navigateByUrl('/home');
        }
      }
    });
  }

  initFormControl(): void {
    this.loginForm = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const rowForm = this.loginForm.getRawValue();
      this.authService
        .login(rowForm.email, rowForm.password)
        .subscribe({
          next: () => {
            this.errorLogin = false;
            this.router.navigateByUrl('/home');
          },
          error: () => {
            this.errorLogin = true;
          }
        })
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitForm();
    }
  }

  onClickLoginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}