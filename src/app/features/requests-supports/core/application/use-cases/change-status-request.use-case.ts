import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  ChangeStatusRequestCommand,
  RequestsSupportsService,
} from '../../domain/services/requests-supports.service';

@Injectable()
export class ChangeStatusRequestUseCase {
  private readonly requestsSupportsService = inject(RequestsSupportsService);

  execute(command: ChangeStatusRequestCommand): Observable<boolean> {
    return this.requestsSupportsService.changeStatus(command);
  }
}
