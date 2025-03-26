import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  authForm!: FormGroup;
  isRegister = true;

  constructor(
    private readonly auth: AuthenticationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.authForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
    if (!this.isRegister) {
      this.authForm.get('name')?.reset();
    }
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { name, email, password } = this.authForm.value;

    if (this.isRegister) {
      this.auth.register(email, password, name).subscribe({
        next: (user) => {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Registration error:', err),
      });
    } else {
      this.auth.login(email, password).subscribe({
        next: (user) => {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Login error:', err),
      });
    }
  }
}
