import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';
import {
  AcademicProgramDto,
  AcademicProgramsService,
} from '../../domain/services/academic-programs.service';

@Injectable()
export class GetAcademicProgramsUseCase {
  private readonly academicProgramsService = inject(AcademicProgramsService);

  execute(query: PaginationQuery): Observable<PaginatedList<AcademicProgramDto>> {
    return this.academicProgramsService.getAcademicPrograms(query);
  }
}
