import { Observable } from "rxjs";
import { RequestsSupportsService } from "../../domain/services/requests-supports.service";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class DownloadConstancyUseCase {
  private readonly requestsSupportsService = inject(RequestsSupportsService);

  execute(id: number): Observable<Blob> {
    return this.requestsSupportsService.downloadConstancy(id);
  }
}