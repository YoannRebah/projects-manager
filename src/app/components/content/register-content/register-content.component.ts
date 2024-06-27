import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/base/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-content.component.html',
  styleUrl: './register-content.component.scss'
})

export class RegisterContentComponent implements OnInit {
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService)

  constructor() {}

  ngOnInit(): void {
    this.initRegisterFormControl();
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
      console.log('Form is invalid');
    } else {
      console.log('Form Submitted!', this.registerForm.value);
      this.onSubmit();
      // Your form submission logic here
    }
  }

  onClickSubmitRegisterForm(): void {
    this.onSubmitRegisterForm();
  }

}