import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor() {}

  ngOnInit(): void {
    this.initFormControl();
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
      // const rowForm = this.registerForm.getRawValue();
      // this.authService
      //   .register(rowForm.email, rowForm.username, rowForm.password)
      //   .subscribe({
      //     next: () => {
      //       this.router.navigateByUrl('/')
      //     },
      //     error: (e) => console.error('error onSubmit : ', e)
      //   })
    }
  }

  onClickRegisterWithGoogle(): void {
    // this.authService.registerWithGoogle().subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/home');
    //   },
    //   error: (e) => console.error('error onClickRegisterWithGoogle : ', e)
    // });
  }

  onClickSubmitForm(): void {
    this.submitForm();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submitForm();
    }
  }

}