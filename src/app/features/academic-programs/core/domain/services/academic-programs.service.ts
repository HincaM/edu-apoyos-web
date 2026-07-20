import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';

export interface AcademicProgramDto {
  id: number;
  name: string;
  description: string | null;
}

@Injectable()
export abstract class AcademicProgramsService {
  abstract getAcademicPrograms(
    query: PaginationQuery,
  ): Observable<PaginatedList<AcademicProgramDto>>;
}
