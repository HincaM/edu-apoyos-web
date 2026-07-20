import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { email, form, maxLength, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { EduFlatButton } from '../../../../shared/components/button/edu-flat-button';
import { EduInput } from '../../../../shared/components/input/edu-input';
import { EduNumericInput } from '../../../../shared/components/numeric-input/edu-numeric-input';
import { EduSelect, EduSelectOption } from '../../../../shared/components/select/edu-select';
import { DocumentType, Role } from '../../core/domain/services/auth.service';
import { RegisterUseCase } from '../../core/application/use-cases/register.use-case';
import { GetAcademicProgramsUseCase } from '../../../academic-programs/core/application/use-cases/get-academic-programs.use-case';
import { ToastService } from '../../../../shared/services/toast.service';
import { ErrorHelperService } from '../../../../core/services/error-helper.service';

const ACADEMIC_PROGRAMS_PAGE_SIZE = 100;

interface RegisterModel {
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
    MatInputModule,
    MatRadioModule,
    EduInput,
    EduNumericInput,
    EduSelect,
    EduFlatButton,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage implements OnInit {
  private readonly registerUseCase = inject(RegisterUseCase);
  private readonly getAcademicProgramsUseCase = inject(GetAcademicProgramsUseCase);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly errorHelper = inject(ErrorHelperService);

  protected readonly Role = Role;

  protected readonly documentTypeOptions: EduSelectOption<DocumentType>[] = [
    { value: DocumentType.IdentityCard, label: 'Tarjeta de identidad' },
    { value: DocumentType.Cedula, label: 'Cédula' },
    { value: DocumentType.ForeignCedula, label: 'Cédula de extranjería' },
  ];

  protected readonly hidePassword = signal(true);
  protected readonly submitting = signal(false);

  protected readonly academicProgramOptions = signal<EduSelectOption<number>[]>([]);
  protected readonly loadingAcademicPrograms = signal(false);

  protected readonly documentType = signal<DocumentType | null>(null);
  protected readonly documentNumber = signal('');
  protected readonly academicProgramId = signal<number | null>(null);
  protected readonly semester = signal('');
  protected readonly studentFieldsTouched = signal(false);

  private readonly model = signal<RegisterModel>({
    fullName: '',
    email: '',
    password: '',
    role: Role.Student,
  });

  protected readonly registerForm = form(this.model, (path) => {
    required(path.fullName, { message: 'El nombre es obligatorio' });
    maxLength(path.fullName, 200, { message: 'Máximo 200 caracteres' });
    required(path.email, { message: 'El correo es obligatorio' });
    email(path.email, { message: 'Ingresa un correo válido' });
    maxLength(path.email, 200, { message: 'Máximo 200 caracteres' });
    required(path.password, { message: 'La contraseña es obligatoria' });
  });

  protected readonly isStudent = computed(() => this.registerForm.role().value() === Role.Student);

  protected readonly semesterValid = computed(() => {
    const value = Number(this.semester());
    return this.semester().trim() !== '' && Number.isInteger(value) && value > 0;
  });

  protected readonly studentFieldsValid = computed(
    () =>
      !this.isStudent() ||
      (this.documentType() !== null &&
        this.documentNumber().trim() !== '' &&
        this.academicProgramId() !== null &&
        this.semesterValid()),
  );

  ngOnInit(): void {
    this.loadAcademicPrograms();
  }

  protected togglePasswordVisibility(): void {
    this.hidePassword.update((hidden) => !hidden);
  }

  protected register(): void {
    this.studentFieldsTouched.set(true);
    if (!this.studentFieldsValid()) {
      return;
    }

    submit(this.registerForm, async () => {
      this.submitting.set(true);
      try {
        await firstValueFrom(
          this.registerUseCase.execute({
            documentType: this.documentType() ?? DocumentType.Cedula,
            documentNumber: this.isStudent() ? this.documentNumber() : '',
            academicProgramId: this.isStudent() ? (this.academicProgramId() ?? 0) : 0,
            semester: this.isStudent() ? Number(this.semester()) : 0,
            ...this.model(),
          }),
        );
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

  private async loadAcademicPrograms(): Promise<void> {
    this.loadingAcademicPrograms.set(true);
    try {
      const page = await firstValueFrom(
        this.getAcademicProgramsUseCase.execute({
          currentPage: 1,
          pageSize: ACADEMIC_PROGRAMS_PAGE_SIZE,
        }),
      );
      this.academicProgramOptions.set(
        page.results.map((program) => ({ value: program.id, label: program.name })),
      );
    } catch (err) {
      this.toast.error(
        this.errorHelper.extractErrorMessage(err, 'No se pudieron cargar los programas académicos'),
      );
    } finally {
      this.loadingAcademicPrograms.set(false);
    }
  }
}
