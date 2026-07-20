import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';

export interface StudentDto {
  id: number;
  userId: string;
  userName: string | null;
  documentNumber: string;
  academicProgramId: number;
  academicProgramName: string | null;
  semester: number;
}

@Injectable()
export abstract class StudentsService {
  abstract getStudents(query: PaginationQuery): Observable<PaginatedList<StudentDto>>;
}
