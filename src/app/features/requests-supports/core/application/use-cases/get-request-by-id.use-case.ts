import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  RequestSupportDto,
  RequestsSupportsService,
} from '../../domain/services/requests-supports.service';

@Injectable()
export class GetRequestByIdUseCase {
  private readonly requestsSupportsService = inject(RequestsSupportsService);

  execute(id: number): Observable<RequestSupportDto> {
    return this.requestsSupportsService.getRequestById(id);
  }
}
