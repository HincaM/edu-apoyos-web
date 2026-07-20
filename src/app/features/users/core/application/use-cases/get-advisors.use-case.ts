import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PaginatedList, PaginationQuery } from '@shared/models/paginated-list';
import { AdvisorDto, UsersService } from '../../domain/services/users.service';

@Injectable()
export class GetAdvisorsUseCase {
  private readonly usersService = inject(UsersService);

  execute(query: PaginationQuery): Observable<PaginatedList<AdvisorDto>> {
    return this.usersService.getAdvisors(query);
  }
}
