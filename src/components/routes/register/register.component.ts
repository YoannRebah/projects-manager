import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      "username": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      const rowForm = this.registerForm.getRawValue();
      this.authService
        .register(rowForm.email, rowForm.username, rowForm.password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/home')
          },
          error: (e) => console.error('error onSubmit : ', e)
        })
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

  @HostListener('window:keydown', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitForm();
    }
  }

}