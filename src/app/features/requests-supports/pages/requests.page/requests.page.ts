import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { EduFlatButton } from '../../../../shared/components/button/edu-flat-button';
import { EduSelect, EduSelectOption } from '../../../../shared/components/select/edu-select';
import { GetRequestsUseCase } from '../../core/application/use-cases/get-requests.use-case';
import { GetStudentRequestsUseCase } from '../../core/application/use-cases/get-student-requests.use-case';
import {
  RequestSupportDto,
  Status,
  TypeSupport,
} from '../../core/domain/services/requests-supports.service';
import { ErrorHelperService } from '../../../../core/services/error-helper.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AuthTokenService } from '../../../../core/services/auth-token.service';
import { ROLE_CLAIM_VALUES, Role } from '../../../login/core/domain/services/auth.service';

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'app-requests-page',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    EduFlatButton,
    EduSelect,
  ],
  templateUrl: './requests.page.html',
  styleUrl: './requests.page.scss',
})
export class RequestsPage implements OnInit {
  private readonly getRequestsUseCase = inject(GetRequestsUseCase);
  private readonly getStudentRequestsUseCase = inject(GetStudentRequestsUseCase);
  private readonly toast = inject(ToastService);
  private readonly errorHelper = inject(ErrorHelperService);
  private readonly router = inject(Router);
  private readonly authToken = inject(AuthTokenService);

  protected readonly isStudent = this.authToken.getRole() === ROLE_CLAIM_VALUES[Role.Student];

  protected readonly statusOptions: EduSelectOption<Status>[] = [
    { value: Status.Pending, label: 'Pendiente' },
    { value: Status.UnderReview, label: 'En revisión' },
    { value: Status.Approved, label: 'Aprobada' },
    { value: Status.Rejected, label: 'Rechazada' },
  ];

  protected readonly typeOptions: EduSelectOption<TypeSupport>[] = [
    { value: TypeSupport.Scholarship, label: 'Beca' },
    { value: TypeSupport.Loan, label: 'Crédito' },
    { value: TypeSupport.Subsidy, label: 'Subsidio' },
  ];

  protected readonly displayedColumns = [
    'id',
    'studentName',
    'typeSupportDescription',
    'requestedAmount',
    'statusDescription',
    'applicationDate',
  ];

  protected readonly loading = signal(false);
  protected readonly results = signal<RequestSupportDto[]>([]);
  protected readonly totalCount = signal(0);
  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  protected readonly statusFilter = signal<Status | null>(null);
  protected readonly typeFilter = signal<TypeSupport | null>(null);

  ngOnInit(): void {
    this.load();
  }

  protected goToCreate(): void {
    this.router.navigateByUrl('/requests/create');
  }

  protected onPageChange(event: PageEvent): void {
    this.currentPage.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.load();
  }

  protected onStatusFilterChange(status: Status | null): void {
    this.statusFilter.set(status);
    this.currentPage.set(1);
    this.load();
  }

  protected onTypeFilterChange(type: TypeSupport | null): void {
    this.typeFilter.set(type);
    this.currentPage.set(1);
    this.load();
  }

  protected statusColor(status: Status): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case Status.Approved:
        return 'primary';
      case Status.Rejected:
        return 'warn';
      default:
        return 'accent';
    }
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    try {
      debugger
      const page = this.isStudent
        ? await firstValueFrom(
            this.getStudentRequestsUseCase.execute({
              studentId: Number(this.authToken.getStudentId()),
              currentPage: this.currentPage(),
              pageSize: this.pageSize(),
            }),
          )
        : await firstValueFrom(
            this.getRequestsUseCase.execute({
              currentPage: this.currentPage(),
              pageSize: this.pageSize(),
              status: this.statusFilter() ?? undefined,
              type: this.typeFilter() ?? undefined,
            }),
          );
      this.results.set(page.results);
      this.totalCount.set(page.totalCount);
    } catch (err) {
      this.toast.error(this.errorHelper.extractErrorMessage(err, 'No se pudieron cargar las solicitudes'));
    } finally {
      this.loading.set(false);
    }
  }
}
