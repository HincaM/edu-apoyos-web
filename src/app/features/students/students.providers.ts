import { Provider } from "@angular/core";
import { StudentsService } from "./core/domain/services/students.service";
import { StudentsImplService } from "./core/infrastructure/implementations/students.impl.service";
import { GetStudentsUseCase } from "./core/application/use-cases/get-students.use-case";

export const STUDENTS_PROVIDERS: Provider[] = [
  { provide: StudentsService, useClass: StudentsImplService },
  GetStudentsUseCase,
];
