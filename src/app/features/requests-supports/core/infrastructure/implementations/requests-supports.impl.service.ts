import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  ChangeStatusRequestCommand,
  CreateRequestCommand,
  GetRequestsQuery,
  GetStudentRequestsQuery,
  PaginatedList,
  RequestSupportDto,
  RequestsSupportsService,
} from '../../domain/services/requests-supports.service';

@Injectable()
export class RequestsSupportsImplService implements RequestsSupportsService {
  private readonly http = inject(HttpClient);

  getRequests(query: GetRequestsQuery): Observable<PaginatedList<RequestSupportDto>> {
    let params = new HttpParams()
      .set('currentPage', query.currentPage)
      .set('pageSize', query.pageSize);

    if (query.status !== undefined) {
      params = params.set('status', query.status);
    }
    if (query.type !== undefined) {
      params = params.set('type', query.type);
    }

    return this.http.get<PaginatedList<RequestSupportDto>>('requests', { params });
  }

  getStudentRequests(
    query: GetStudentRequestsQuery,
  ): Observable<PaginatedList<RequestSupportDto>> {
    let params = new HttpParams()
      .set('currentPage', query.currentPage)
      .set('pageSize', query.pageSize);

      if (query.status !== undefined) {
      params = params.set('status', query.status);
    }
    if (query.type !== undefined) {
      params = params.set('type', query.type);
    }

    return this.http.get<PaginatedList<RequestSupportDto>>(
      `students/${query.studentId}/requests`,
      { params },
    );
  }

  getRequestById(id: number): Observable<RequestSupportDto> {
    return this.http.get<RequestSupportDto>(`requests/${id}`);
  }

  createRequest(command: CreateRequestCommand): Observable<number> {
    return this.http.post<number>('requests', command);
  }

  changeStatus(command: ChangeStatusRequestCommand): Observable<boolean> {
    return this.http.patch<boolean>(`requests/${command.requestSupportId}/estado`, {
      currentStatus: command.currentStatus,
      status: command.status,
      observation: command.observation,
    });
  }
}
