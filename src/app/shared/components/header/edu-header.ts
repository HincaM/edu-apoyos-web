import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthTokenService } from '../../../core/services/auth-token.service';
import { EduFlatButton } from '../button/edu-flat-button';

@Component({
  selector: 'edu-header',
  imports: [RouterLink, MatIconModule, MatToolbarModule, EduFlatButton],
  templateUrl: './edu-header.html',
  styleUrl: './edu-header.scss',
})
export class EduHeader {
  private readonly authToken = inject(AuthTokenService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.authToken.clearToken();
    this.router.navigate(['/login']);
  }
}
