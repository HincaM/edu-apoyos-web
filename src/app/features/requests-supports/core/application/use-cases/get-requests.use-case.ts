import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  GetRequestsQuery,
  PaginatedList,
  RequestSupportDto,
  RequestsSupportsService,
} from '../../domain/services/requests-supports.service';

@Injectable()
export class GetRequestsUseCase {
  private readonly requestsSupportsService = inject(RequestsSupportsService);

  execute(query: GetRequestsQuery): Observable<PaginatedList<RequestSupportDto>> {
    return this.requestsSupportsService.getRequests(query);
  }
}
