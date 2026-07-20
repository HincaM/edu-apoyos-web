import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';

export interface AdvisorDto {
  id: number;
  fullName: string;
}

@Injectable()
export abstract class UsersService {
  abstract getAdvisors(query: PaginationQuery): Observable<PaginatedList<AdvisorDto>>;
}
