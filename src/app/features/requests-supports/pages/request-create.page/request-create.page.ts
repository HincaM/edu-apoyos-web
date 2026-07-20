import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EduFlatButton } from '../../../../shared/components/button/edu-flat-button';
import { EduSelect, EduSelectOption } from '../../../../shared/components/select/edu-select';
import { CreateRequestUseCase } from '../../core/application/use-cases/create-request.use-case';
import { TypeSupport } from '../../core/domain/services/requests-supports.service';
import { GetStudentsUseCase } from '../../../students/core/application/use-cases/get-students.use-case';
import { GetAdvisorsUseCase } from '../../../users/core/application/use-cases/get-advisors.use-case';
import type { AdvisorDto } from '../../../users/core/domain/services/users.service';
import type { PaginatedList } from '@shared/models/paginated-list';
import { ToastService } from '../../../../shared/services/toast.service';
import { ErrorHelperService } from '../../../../core/services/error-helper.service';
import { AuthTokenService } from '../../../../core/services/auth-token.service';
import { ROLE_CLAIM_VALUES, Role } from '../../../login/core/domain/services/auth.service';

const STUDENTS_PAGE_SIZE = 100;
const ADVISORS_PAGE_SIZE = 100;

@Component({
  selector: 'app-request-create-page',
  imports: [
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    EduSelect,
    EduFlatButton,
  ],
  templateUrl: './request-create.page.html',
  styleUrl: './request-create.page.scss',
})
export class RequestCreatePage implements OnInit {
  private readonly createRequestUseCase = inject(CreateRequestUseCase);
  private readonly getStudentsUseCase = inject(GetStudentsUseCase);
  private readonly getAdvisorsUseCase = inject(GetAdvisorsUseCase);
  private readonly toast = inject(ToastService);
  private readonly errorHelper = inject(ErrorHelperService);
  private readonly router = inject(Router);
  private readonly authToken = inject(AuthTokenService);

  protected readonly isStudent = this.authToken.getRole() === ROLE_CLAIM_VALUES[Role.Student];

  protected readonly typeSupportOptions: EduSelectOption<TypeSupport>[] = [
    { value: TypeSupport.Scholarship, label: 'Beca' },
    { value: TypeSupport.Loan, label: 'Crédito' },
    { value: TypeSupport.Subsidy, label: 'Subsidio' },
  ];

  protected readonly studentOptions = signal<EduSelectOption<number>[]>([]);
  protected readonly advisorOptions = signal<EduSelectOption<number>[]>([]);
  protected readonly loadingOptions = signal(false);

  protected readonly studentId = signal<number | null>(null);
  protected readonly advisorId = signal<number | null>(null);
  protected readonly typeSupport = signal<TypeSupport | null>(null);
  protected readonly requestedAmount = signal('');
  protected readonly description = signal('');

  protected readonly touched = signal(false);
  protected readonly submitting = signal(false);

  protected readonly amountValid = computed(() => {
    const amount = Number(this.requestedAmount());
    return this.requestedAmount().trim() !== '' && amount > 0;
  });

  protected readonly formValid = computed(
    () =>
      this.studentId() !== null &&
      this.advisorId() !== null &&
      this.typeSupport() !== null &&
      this.amountValid() &&
      this.description().trim() !== '',
  );

  ngOnInit(): void {
    if (this.isStudent) {
      const claimNameId = Number(this.authToken.getNameId());
      this.advisorId.set(Number.isNaN(claimNameId) ? null : claimNameId);
    }
    this.loadOptions();
  }

  protected create(): void {
    this.touched.set(true);
    if (!this.formValid()) {
      return;
    }

    this.submitting.set(true);
    firstValueFrom(
      this.createRequestUseCase.execute({
        studentId: this.studentId()!,
        userId: '',
        typeSupport: this.typeSupport()!,
        requestedAmount: Number(this.requestedAmount()),
        description: this.description(),
        advisorId: String(this.advisorId()),
      }),
    )
      .then(() => {
        this.toast.success('Solicitud creada correctamente');
        this.router.navigateByUrl('/requests');
      })
      .catch((err: unknown) => {
        this.toast.error(this.errorHelper.extractErrorMessage(err, 'No se pudo crear la solicitud'));
      })
      .finally(() => {
        this.submitting.set(false);
      });
  }

  private async loadOptions(): Promise<void> {
    this.loadingOptions.set(true);
    try {
      const [students, advisors] = await Promise.all([
        firstValueFrom(
          this.getStudentsUseCase.execute({ currentPage: 1, pageSize: STUDENTS_PAGE_SIZE }),
        ),
        this.isStudent
          ? Promise.resolve<PaginatedList<AdvisorDto> | null>(null)
          : firstValueFrom(
              this.getAdvisorsUseCase.execute({ currentPage: 1, pageSize: ADVISORS_PAGE_SIZE }),
            ),
      ]);

      this.studentOptions.set(
        students.results.map((student) => ({
          value: student.id,
          label: student.userName ?? student.documentNumber,
        })),
      );
      if (advisors) {
        this.advisorOptions.set(
          advisors.results.map((advisor) => ({ value: advisor.id, label: advisor.fullName })),
        );
      }
    } catch (err) {
      this.toast.error(this.errorHelper.extractErrorMessage(err, 'No se pudieron cargar los datos del formulario'));
    } finally {
      this.loadingOptions.set(false);
    }
  }
}
