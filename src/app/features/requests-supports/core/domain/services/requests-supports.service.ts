import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

export enum Status {
  Pending = 1,
  UnderReview = 2,
  Approved = 3,
  Rejected = 4,
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
}

export interface CreateRequestCommand {
  studentId: number;
  userId: string;
  typeSupport: TypeSupport;
  requestedAmount: number;
  description: string;
  advisorId: string;
}

@Injectable()
export abstract class RequestsSupportsService {
  abstract getRequests(query: GetRequestsQuery): Observable<PaginatedList<RequestSupportDto>>;
  abstract getStudentRequests(
    query: GetStudentRequestsQuery,
  ): Observable<PaginatedList<RequestSupportDto>>;
  abstract createRequest(command: CreateRequestCommand): Observable<number>;
}
