import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';
import { StudentDto, StudentsService } from '../../domain/services/students.service';

@Injectable()
export class GetStudentsUseCase {
  private readonly studentsService = inject(StudentsService);

  execute(query: PaginationQuery): Observable<PaginatedList<StudentDto>> {
    return this.studentsService.getStudents(query);
  }
}
