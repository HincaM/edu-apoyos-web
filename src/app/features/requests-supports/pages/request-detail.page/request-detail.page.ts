import { Component, OnInit, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EduSelectOption } from '../../../../shared/components/select/edu-select';
import {
  EduChangeStatusDialog,
  EduChangeStatusDialogResult,
} from '../../../../shared/components/change-status-dialog/edu-change-status-dialog';
import { GetRequestByIdUseCase } from '../../core/application/use-cases/get-request-by-id.use-case';
import { ChangeStatusRequestUseCase } from '../../core/application/use-cases/change-status-request.use-case';
import { DownloadConstancyUseCase } from '../../core/application/use-cases/download-constancy.use-case';
import { RequestSupportDto, Status } from '../../core/domain/services/requests-supports.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ErrorHelperService } from '../../../../core/services/error-helper.service';
import { AuthTokenService } from '../../../../core/services/auth-token.service';
import { ROLE_CLAIM_VALUES, Role } from '../../../login/core/domain/services/auth.service';

@Component({
  selector: 'app-request-detail-page',
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
],
  templateUrl: './request-detail.page.html',
  styleUrl: './request-detail.page.scss',
})
export class RequestDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly getRequestByIdUseCase = inject(GetRequestByIdUseCase);
  private readonly changeStatusRequestUseCase = inject(ChangeStatusRequestUseCase);
  private readonly downloadConstancyUseCase = inject(DownloadConstancyUseCase);
  private readonly toast = inject(ToastService);
  private readonly errorHelper = inject(ErrorHelperService);
  private readonly authToken = inject(AuthTokenService);
  private readonly dialog = inject(MatDialog);

  protected readonly isAdvisor = this.authToken.getRole() === ROLE_CLAIM_VALUES[Role.Advisor];

  protected readonly statusOptions: EduSelectOption<Status>[] = [
    { value: Status.Pending, label: 'Pendiente' },
    { value: Status.UnderReview, label: 'En revisión' },
    { value: Status.Approved, label: 'Aprobada' },
    { value: Status.Rejected, label: 'Rechazada' },
  ];

  protected readonly loading = signal(false);
  protected readonly request = signal<RequestSupportDto | null>(null);

  ngOnInit(): void {
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

  protected openChangeStatus(): void {
    const current = this.request();
    if (!current) {
      return;
    }

    const dialogRef = this.dialog.open(EduChangeStatusDialog, {
      data: { currentStatus: current.status, statusOptions: this.statusOptions },
      width: '28rem',
    });

    dialogRef.afterClosed().subscribe((result?: EduChangeStatusDialogResult) => {
      if (result) {
        this.changeStatus(current, result.status, result.observation);
      }
    });
  }

  
  protected async downloadConstancy(): Promise<void> {
    const current = this.request();
    if (!current) {
      return;
    }

    try {
      const blob = await firstValueFrom(this.downloadConstancyUseCase.execute(current.id));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `constancia-${current.id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      this.toast.error(this.errorHelper.extractErrorMessage(err, 'No se pudo descargar la constancia'));
    }
  }

  private async changeStatus(
    current: RequestSupportDto,
    status: Status,
    observation: string,
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.changeStatusRequestUseCase.execute({
          requestSupportId: current.id,
          currentStatus: current.status,
          status,
          observation,
        }),
      );
      this.toast.success('Estado actualizado correctamente');
      this.load();
    } catch (err) {
      this.toast.error(this.errorHelper.extractErrorMessage(err, 'No se pudo actualizar el estado'));
    }
  }

  private async load(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) {
      this.router.navigateByUrl('/requests');
      return;
    }

    this.loading.set(true);
    try {
      const request = await firstValueFrom(this.getRequestByIdUseCase.execute(id));
      this.request.set(request);
    } catch (err) {
      this.toast.error(this.errorHelper.extractErrorMessage(err, 'No se pudo cargar la solicitud'));
    } finally {
      this.loading.set(false);
    }
  }
}
