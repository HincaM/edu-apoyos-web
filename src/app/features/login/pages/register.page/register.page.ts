import { Component, inject, signal } from '@angular/core';
import { email, form, maxLength, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { EduFlatButton } from '../../../../shared/components/button/edu-flat-button';
import { EduInput } from '../../../../shared/components/input/edu-input';
import { Role } from '../../core/domain/services/auth.service';
import { RegisterUseCase } from '../../core/application/use-cases/register.use-case';
import { ToastService } from '../../../../shared/services/toast.service';
import { ErrorHelperService } from '../../../../core/services/error-helper.service';

interface RegisterModel {
  userId: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

@Component({
  selector: 'app-register-page',
  imports: [
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    EduInput,
    EduFlatButton,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage {
  private readonly registerUseCase = inject(RegisterUseCase);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly errorHelper = inject(ErrorHelperService);

  protected readonly Role = Role;
  protected readonly hidePassword = signal(true);
  protected readonly submitting = signal(false);

  private readonly model = signal<RegisterModel>({
    userId: '',
    fullName: '',
    email: '',
    password: '',
    role: Role.Student,
  });

  protected readonly registerForm = form(this.model, (path) => {
    required(path.userId, { message: 'El documento es obligatorio' });
    maxLength(path.userId, 50, { message: 'Máximo 50 caracteres' });
    required(path.fullName, { message: 'El nombre es obligatorio' });
    maxLength(path.fullName, 200, { message: 'Máximo 200 caracteres' });
    required(path.email, { message: 'El correo es obligatorio' });
    email(path.email, { message: 'Ingresa un correo válido' });
    maxLength(path.email, 200, { message: 'Máximo 200 caracteres' });
    required(path.password, { message: 'La contraseña es obligatoria' });
  });

  protected togglePasswordVisibility(): void {
    this.hidePassword.update((hidden) => !hidden);
  }

  protected register(): void {
    submit(this.registerForm, async () => {
      this.submitting.set(true);
      try {
        await firstValueFrom(this.registerUseCase.execute(this.model()));
        this.toast.success('Cuenta creada correctamente');
        this.router.navigateByUrl('/login');
      } catch (err) {
        this.toast.error(this.errorHelper.extractErrorMessage(err, 'No se pudo crear la cuenta'));
      } finally {
        this.submitting.set(false);
      }
      return undefined;
    });
  }
}
