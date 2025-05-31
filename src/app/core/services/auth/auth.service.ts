import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iLogin } from '@shared/models/login.model';
import { iToken } from '@shared/models/token.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  login(loginData: iLogin): Observable<iToken> {
    return this.http.post<iToken>(`${apiUrl}/auth/login`, loginData);
  }
}
