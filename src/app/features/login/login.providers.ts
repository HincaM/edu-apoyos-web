import { Provider } from "@angular/core";
import { AuthImplService } from "./core/infrastructure/implementations/auth.impl.service";
import { AuthService } from "./core/domain/services/auth.service";
import { LoginUseCase } from "./core/application/use-cases/login.use-case";
import { RegisterUseCase } from "./core/application/use-cases/register.use-case";

export const LOGIN_PROVIDERS: Provider[] = [
  { provide: AuthService, useClass: AuthImplService },
  LoginUseCase,
  RegisterUseCase,
];
