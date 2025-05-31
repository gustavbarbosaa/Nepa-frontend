import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iLogin } from '@app/shared/models/login.model';
import { iToken } from '@app/shared/models/token.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  login(loginData: iLogin): Promise<iToken> {
    return this.http.post<iToken>(`${apiUrl}/auth/login`, loginData);
  }
}
