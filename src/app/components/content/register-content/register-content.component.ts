import { Router } from '@angular/router';
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/base/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoaderHourglassService } from '../../../shared/services/components/loader-hourglass.service';

@Component({
  selector: 'app-register-content',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-content.component.html',
  styleUrl: './register-content.component.scss'
})

export class RegisterContentComponent implements OnInit {
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  loaderHourglassService = inject(LoaderHourglassService);

  constructor() {}

  ngOnInit(): void {
    this.checkUserConnectionStatus();
    this.initRegisterFormControl();
  }

  onClickSubmitRegisterForm(): void {
    this.onSubmitRegisterForm();
  }

  onClickCancel(): void {
    this.loaderHourglassService.show();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmitRegisterForm();
    }
  }

  initRegisterFormControl(): void {
    this.registerForm = this.formBuilder.group({
      "username": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', Validators.required]
    });
  }

  onSubmit(): void {
    const rowForm = this.registerForm.getRawValue();
    this.authService
      .register(rowForm.email, rowForm.username, rowForm.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/')
        },
        error: (e) => console.error('error onSubmit : ', e)
      })
  }

  onSubmitRegisterForm(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.onSubmit();
    }
  }

  onClickRegisterWithGoogle(): void {
    this.authService.registerWithGoogle().subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (e) => console.error('error onClickRegisterWithGoogle : ', e)
    });
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

}