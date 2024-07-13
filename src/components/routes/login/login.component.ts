import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  loginForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initFormControl();
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
            this.router.navigateByUrl('/home');
          },
          error: (e) => {
            console.error('error submitForm login : ', e);
            throw(e);
          }
        });
    }
  }

  onClickLoginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (e) => {
        console.error('error onClickLoginWithGoogle : ', e);
        throw(e);
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitForm();
    }
  }

}