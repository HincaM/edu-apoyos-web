import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  CreateRequestCommand,
  RequestsSupportsService,
} from '../../domain/services/requests-supports.service';

@Injectable()
export class CreateRequestUseCase {
  private readonly requestsSupportsService = inject(RequestsSupportsService);

  execute(command: CreateRequestCommand): Observable<number> {
    return this.requestsSupportsService.createRequest(command);
  }
}
