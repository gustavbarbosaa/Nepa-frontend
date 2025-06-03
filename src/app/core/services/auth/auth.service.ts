import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iLogin } from '@shared/models/login.model';
import { iToken } from '@shared/models/token.model';
import { environment } from '@env/environment';
import { catchError, Observable, tap } from 'rxjs';
import { TokenService } from '@core/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly apiUrl = environment.apiUrl;

  login(loginData: iLogin): Observable<iToken> {
    return this.http.post<iToken>(`${apiUrl}/auth/login`, loginData).pipe(
      tap(response => {
        this.tokenService.setAccessToken(response.access_token);
        this.tokenService.setRefreshToken(response.refresh_token);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  logout(): void {
    this.tokenService.clearTokens();
  }
}
