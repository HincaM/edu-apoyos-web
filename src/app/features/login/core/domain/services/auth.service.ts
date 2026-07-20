import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export enum Role {
  Advisor = 1,
  Student = 2,
}

export const ROLE_CLAIM_VALUES: Record<Role, string> = {
  [Role.Advisor]: 'Asesor',
  [Role.Student]: 'Estudiante',
};

export enum DocumentType {
  IdentityCard = 1,
  Cedula = 2,
  ForeignCedula = 3,
}

export interface RegisterRequest {
  documentType: DocumentType;
  documentNumber: string;
  academicProgramId: number;
  semester: number;
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

@Injectable()
export abstract class AuthService {
  abstract login(request: LoginRequest): Observable<string>;
  abstract register(request: RegisterRequest): Observable<boolean>;
}
