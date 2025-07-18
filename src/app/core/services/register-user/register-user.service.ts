import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  iRegisterUserRequest,
  iRegisterUserResponse,
} from '@shared/models/register-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  register(
    registerData: iRegisterUserRequest
  ): Observable<iRegisterUserResponse> {
    return this.http.post<iRegisterUserResponse>(
      `${this.apiUrl}/auth/register`,
      registerData
    );
  }
}
