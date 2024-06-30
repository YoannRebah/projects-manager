import { Component, OnInit, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/base/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderHourglassService } from '../../../shared/services/components/loader-hourglass.service';
import { TimeoutService } from '../../../shared/services/utilities/timeout.service';

@Component({
  selector: 'app-login-content',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-content.component.html',
  styleUrl: './login-content.component.scss'
})

export class LoginContentComponent implements OnInit {
  loginForm!: FormGroup;
  errorLogin!: boolean;
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  loaderHourglassService = inject(LoaderHourglassService);

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
          this.router.navigateByUrl('/home')
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

  @HostListener('window:keydown', ['$event'])
  handleKeyDownTerminal(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmitLoginForm();
    }
  }

  onClickCancel(): void {
    this.loaderHourglassService.show();
  }

}