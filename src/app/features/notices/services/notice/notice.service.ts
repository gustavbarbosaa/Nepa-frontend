import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iNoticeRequest, iNoticeResponse } from '@shared/models/notice.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAll(): Observable<iNoticeResponse[]> {
    return this.http
      .get<iNoticeResponse[]>(`${this.apiUrl}/editais/`)
      .pipe(take(1));
  }

  post(notice: iNoticeRequest): Observable<iNoticeResponse> {
    return this.http.post<iNoticeResponse>(`${this.apiUrl}/editais/`, notice);
  }

  getById(id: string): Observable<iNoticeResponse> {
    return this.http
      .get<iNoticeResponse>(`${this.apiUrl}/editais/${id}`)
      .pipe(take(1));
  }

  getBySlug(slug: string): Observable<unknown> {
    return this.http
      .get(`${this.apiUrl}/editais/${slug}`, {
        responseType: 'blob',
      })
      .pipe(take(1));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/editais/${id}`).pipe(take(1));
  }

  insertFile(id: string, file: FormData): Observable<iNoticeResponse> {
    return this.http
      .put<iNoticeResponse>(`${this.apiUrl}/editais/${id}/arquivo`, file)
      .pipe(take(1));
  }
}
