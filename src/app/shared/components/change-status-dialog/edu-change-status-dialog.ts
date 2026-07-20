import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EduSelect, EduSelectOption } from '../select/edu-select';
import { Status } from '../../../features/requests-supports/core/domain/services/requests-supports.service';

export interface EduChangeStatusDialogData {
  currentStatus: Status;
  statusOptions: EduSelectOption<Status>[];
}

export interface EduChangeStatusDialogResult {
  status: Status;
  observation: string;
}

@Component({
  selector: 'edu-change-status-dialog',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, EduSelect],
  templateUrl: './edu-change-status-dialog.html',
  styleUrl: './edu-change-status-dialog.scss',
})
export class EduChangeStatusDialog {
  private readonly dialogRef = inject(MatDialogRef<EduChangeStatusDialog, EduChangeStatusDialogResult>);
  protected readonly data = inject<EduChangeStatusDialogData>(MAT_DIALOG_DATA);

  protected readonly status = signal<Status | null>(null);
  protected readonly observation = signal('');
  protected readonly touched = signal(false);

  protected readonly statusOptions = this.data.statusOptions.filter(
    (option) => option.value !== this.data.currentStatus,
  );

  protected cancel(): void {
    this.dialogRef.close();
  }

  protected confirm(): void {
    this.touched.set(true);
    if (this.status() === null || !this.observation().trim()) {
      return;
    }
    this.dialogRef.close({ status: this.status()!, observation: this.observation().trim() });
  }
}
