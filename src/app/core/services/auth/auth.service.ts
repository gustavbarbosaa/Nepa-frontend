import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iLogin } from '@shared/models/login.model';
import { iToken } from '@shared/models/token.model';
import { environment } from '@env/environment';
import { catchError, Observable, tap } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);
  private readonly apiUrl = environment.apiUrl;

  login(loginData: iLogin): Observable<iToken> {
    return this.http.post<iToken>(`${apiUrl}/auth/login`, loginData).pipe(
      tap(response => {
        console.log(response);
        this.toastService.showSuccess('Login realizado com sucesso', 'Sucesso');
      }),
      catchError(error => {
        this.toastService.showError(error.message, `Erro no login`);
        throw error;
      })
    );
  }
}
