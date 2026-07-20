import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';
import { AdvisorDto, UsersService } from '../../domain/services/users.service';

@Injectable()
export class UsersImplService implements UsersService {
  private readonly http = inject(HttpClient);

  getAdvisors(query: PaginationQuery): Observable<PaginatedList<AdvisorDto>> {
    const params = new HttpParams()
      .set('currentPage', query.currentPage)
      .set('pageSize', query.pageSize);

    return this.http.get<PaginatedList<AdvisorDto>>('users', { params });
  }
}
