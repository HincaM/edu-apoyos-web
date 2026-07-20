import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';
import {
  AcademicProgramDto,
  AcademicProgramsService,
} from '../../domain/services/academic-programs.service';

@Injectable()
export class AcademicProgramsImplService implements AcademicProgramsService {
  private readonly http = inject(HttpClient);

  getAcademicPrograms(query: PaginationQuery): Observable<PaginatedList<AcademicProgramDto>> {
    const params = new HttpParams()
      .set('currentPage', query.currentPage)
      .set('pageSize', query.pageSize);

    return this.http.get<PaginatedList<AcademicProgramDto>>('academic-programs', { params });
  }
}
