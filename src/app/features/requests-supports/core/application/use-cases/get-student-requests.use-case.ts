import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  GetStudentRequestsQuery,
  PaginatedList,
  RequestSupportDto,
  RequestsSupportsService,
} from '../../domain/services/requests-supports.service';

@Injectable()
export class GetStudentRequestsUseCase {
  private readonly requestsSupportsService = inject(RequestsSupportsService);

  execute(query: GetStudentRequestsQuery): Observable<PaginatedList<RequestSupportDto>> {
    return this.requestsSupportsService.getStudentRequests(query);
  }
}
