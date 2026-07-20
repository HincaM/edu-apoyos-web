import { Provider } from "@angular/core";
import { AcademicProgramsService } from "./core/domain/services/academic-programs.service";
import { AcademicProgramsImplService } from "./core/infrastructure/implementations/academic-programs.impl.service";
import { GetAcademicProgramsUseCase } from "./core/application/use-cases/get-academic-programs.use-case";

export const ACADEMIC_PROGRAMS_PROVIDERS: Provider[] = [
  { provide: AcademicProgramsService, useClass: AcademicProgramsImplService },
  GetAcademicProgramsUseCase,
];
