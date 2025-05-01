import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/template/layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-authentication',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutComponent,
    TranslateModule,
    FontAwesomeModule,
  ],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  authForm!: FormGroup;
  isRegister = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showPassword = false;
  icons = {
    eye: faEye,
    eyeSlash: faEyeSlash,
    key: faKey,
    envelope: faEnvelope,
    user: faUser,
  };
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
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleMode() {
    this.errorMessage = null;
    this.isRegister = !this.isRegister;

    const nameControl = this.authForm.get('name');
    if (this.isRegister) {
      nameControl?.setValidators([Validators.required]);
    } else {
      nameControl?.clearValidators();
      nameControl?.reset();
    }
    nameControl?.updateValueAndValidity();
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.authForm.invalid) return;

    const { name, email, password } = this.authForm.value;

    if (this.isRegister) {
      this.auth.register(name, email, password).subscribe({
        next: () => {
          this.successMessage = 'Usuário criado com sucesso!';
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage =
            err.message ?? 'Erro ao registrar. Tente novamente mais tarde.';
        },
      });
    } else {
      this.auth.login(email, password).subscribe({
        next: () => {
          void this.router.navigate(['/home']);
        },
        error: (err) => {
          if (err.message) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage =
              'Servidor indisponível. Tente novamente mais tarde.';
          }
        },
      });
    }
  }
}
