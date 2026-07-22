import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

export enum Status {
  Pending,
  UnderReview,
  Approved,
  Rejected,
}

export enum TypeSupport {
  Scholarship = 0,
  Loan = 1,
  Subsidy = 2,
}

export interface RequestSupportDto {
  id: number;
  studentId: number;
  studentName: string | null;
  typeSupport: TypeSupport;
  typeSupportDescription: string;
  requestedAmount: number;
  description: string;
  status: Status;
  statusDescription: string;
  applicationDate: string;
  dateUpdated: string | null;
  advisorId: string;
  advisorName: string | null;
}

export interface PaginatedList<T> {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  pagesCount: number;
  hasNextPage: boolean;
  results: T[];
}

export interface GetRequestsQuery {
  currentPage: number;
  pageSize: number;
  status?: Status;
  type?: TypeSupport;
}

export interface GetStudentRequestsQuery {
  studentId: number;
  currentPage: number;
  pageSize: number;
  status?: Status;
  type?: TypeSupport;
}

export interface CreateRequestCommand {
  studentId: number;
  typeSupport: TypeSupport;
  requestedAmount: number;
  description: string;
  advisorId: string;
}

export interface ChangeStatusRequestCommand {
  requestSupportId: number;
  currentStatus: Status;
  status: Status;
  observation: string;
}

@Injectable()
export abstract class RequestsSupportsService {
  abstract getRequests(query: GetRequestsQuery): Observable<PaginatedList<RequestSupportDto>>;
  abstract getStudentRequests(
    query: GetStudentRequestsQuery,
  ): Observable<PaginatedList<RequestSupportDto>>;
  abstract getRequestById(id: number): Observable<RequestSupportDto>;
  abstract createRequest(command: CreateRequestCommand): Observable<number>;
  abstract changeStatus(command: ChangeStatusRequestCommand): Observable<boolean>;
  abstract downloadConstancy(id: number): Observable<Blob>;
}
