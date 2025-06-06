import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iLogin } from '@shared/models/login.model';
import { iToken } from '@shared/models/token.model';
import { environment } from '@env/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenService } from '@core/services/token/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly apiUrl = environment.apiUrl;

  login(loginData: iLogin): Observable<iToken> {
    return this.http
      .post<iToken>(`${this.apiUrl}/autenticacao/entrar`, loginData)
      .pipe(
        tap((response: iToken) => {
          this.tokenService.setTokens(response);
          this.tokenService.getNameAndTypeUserForToken();
          this.router.navigate(['/inicio']);
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          let errorMessage = 'Ocorreu um erro desconhecido.';
          if (errorResponse.status === 404) {
            errorMessage =
              'Credenciais inválidas. Verifique seu usuário e senha.';
          } else if (errorResponse.status === 400) {
            if (errorResponse.error && errorResponse.error.message) {
              errorMessage = errorResponse.error.message;
            } else {
              errorMessage = 'Dados inválidos fornecidos.';
            }
          } else if (errorResponse.status >= 500) {
            errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
          }
          console.error('AuthService login error:', errorResponse);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  logout(): void {
    this.tokenService.clearTokens();
    this.router.navigate(['/autenticacao/entrar']);
  }
}
