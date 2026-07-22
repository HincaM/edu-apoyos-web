import { Provider } from "@angular/core";
import { RequestsSupportsService } from "./core/domain/services/requests-supports.service";
import { RequestsSupportsImplService } from "./core/infrastructure/implementations/requests-supports.impl.service";
import { GetRequestsUseCase } from "./core/application/use-cases/get-requests.use-case";
import { GetStudentRequestsUseCase } from "./core/application/use-cases/get-student-requests.use-case";
import { CreateRequestUseCase } from "./core/application/use-cases/create-request.use-case";
import { ChangeStatusRequestUseCase } from "./core/application/use-cases/change-status-request.use-case";
import { GetRequestByIdUseCase } from "./core/application/use-cases/get-request-by-id.use-case";
import { DownloadConstancyUseCase } from "./core/application/use-cases/download-constancy.use-case";

export const REQUESTS_SUPPORTS_PROVIDERS: Provider[] = [
  { provide: RequestsSupportsService, useClass: RequestsSupportsImplService },
  GetRequestsUseCase,
  GetStudentRequestsUseCase,
  CreateRequestUseCase,
  ChangeStatusRequestUseCase,
  GetRequestByIdUseCase,
  DownloadConstancyUseCase
];
