import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/base/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})

export class FormLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorLogin: boolean = false;
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService)

  constructor() {}

  ngOnInit(): void {
    this.initLoginFormControl();
  }

  initLoginFormControl(): void {
    this.loginForm = this.formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', Validators.required]
    });
  }

  onSubmit(): void {
    const rowForm = this.loginForm.getRawValue();
    this.authService
      .login(rowForm.email, rowForm.password)
      .subscribe({
        next: () => {
          this.errorLogin = false;
          this.router.navigateByUrl('/')
        },
        error: () => {
          this.errorLogin = true;
        }
      })
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.onSubmit();
    }
  }

  onClickSubmitLoginForm(): void {
    this.onSubmitLoginForm();
  }

}