import { Provider } from "@angular/core";
import { UsersService } from "./core/domain/services/users.service";
import { UsersImplService } from "./core/infrastructure/implementations/users.impl.service";
import { GetAdvisorsUseCase } from "./core/application/use-cases/get-advisors.use-case";

export const USERS_PROVIDERS: Provider[] = [
  { provide: UsersService, useClass: UsersImplService },
  GetAdvisorsUseCase,
];
