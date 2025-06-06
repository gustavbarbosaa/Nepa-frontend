import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iNoticeRequest, iNoticeResponse } from '@shared/models/notice.model';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAll(): iNoticeResponse[] {
    return this.http
      .get<iNoticeResponse[]>(`${this.apiUrl}/editais/`)
      .pipe(take(1));
  }

  post(notice: iNoticeRequest): iNoticeResponse {
    return this.http.post<iNoticeResponse>(`${this.apiUrl}/editais/`, notice);
  }

  getById(id: string): iNoticeResponse {
    return this.http
      .get<iNoticeResponse>(`${this.apiUrl}/editais/${id}`)
      .pipe(take(1));
  }

  getBySlug(slug: string): iNoticeResponse {
    return this.http
      .get<iNoticeResponse>(`${this.apiUrl}/editais/${slug}`)
      .pipe(take(1));
  }

  delete(id: string): iNoticeResponse {
    return this.http.delete(`${this.apiUrl}/editais/${id}`);
  }
}
