import { Component, OnInit, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/base/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    } else {
      this.onSubmit();
    }
  }

  onClickSubmitRegisterForm(): void {
    this.onSubmitRegisterForm();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownTerminal(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmitRegisterForm();
    }
  }

  onClickCancel(): void {
    this.loaderHourglassService.show();
  }

}