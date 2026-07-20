import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';
import { StudentDto, StudentsService } from '../../domain/services/students.service';

@Injectable()
export class StudentsImplService implements StudentsService {
  private readonly http = inject(HttpClient);

  getStudents(query: PaginationQuery): Observable<PaginatedList<StudentDto>> {
    const params = new HttpParams()
      .set('currentPage', query.currentPage)
      .set('pageSize', query.pageSize);

    return this.http.get<PaginatedList<StudentDto>>('students', { params });
  }
}
