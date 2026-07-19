import { Component, inject, signal } from '@angular/core';
import { email, form, minLength, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { EduFlatButton } from '../../../../shared/components/button/edu-flat-button';
import { EduInput } from '../../../../shared/components/input/edu-input';
import { LoginUseCase } from '../../core/application/use-cases/login.use-case';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    EduInput,
    EduFlatButton,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly loginUseCase = inject(LoginUseCase);

  protected readonly hidePassword = signal(true);
  protected readonly submitting = signal(false);

  private readonly model = signal<LoginModel>({ email: '', password: '' });

  protected readonly loginForm = form(this.model, (path) => {
    required(path.email, { message: 'El correo es obligatorio' });
    email(path.email, { message: 'Ingresa un correo válido' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'Mínimo 6 caracteres' });
  });

  protected togglePasswordVisibility(): void {
    this.hidePassword.update((hidden) => !hidden);
  }

  protected login(): void {
    submit(this.loginForm, async () => {
      this.submitting.set(true);
      try {
        await firstValueFrom(
          this.loginUseCase.execute({
            userId: this.model().email,
            password: this.model().password,
          }),
        );
      } finally {
        this.submitting.set(false);
      }
      return undefined;
    });
  }
}
