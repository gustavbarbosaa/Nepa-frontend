import {
  iRegisterUserRequest,
  iRegisterUserResponse,
} from './../../../shared/models/register-user.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterTeacherService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  register(registerData: iRegisterUserRequest): Promise<iRegisterUserResponse> {
    return this.http.post<iRegisterUserResponse>(
      `${this.apiUrl}/auth/cadastro/professor`,
      registerData
    );
  }
}
