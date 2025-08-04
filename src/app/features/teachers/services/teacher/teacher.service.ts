import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iTeacher } from '@shared/models/teacher.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private http = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAll(active?: boolean): Observable<iTeacher[]> {
    if (active !== undefined) {
      return this.http
        .get<iTeacher[]>(`${this.apiUrl}/professores?ativo=${active}`)
        .pipe(take(1));
    }

    return this.http
      .get<iTeacher[]>(`${this.apiUrl}/professores/`)
      .pipe(take(1));
  }

  edit(id: string, status: { ativo: boolean }): Observable<iTeacher> {
    return this.http
      .patch<iTeacher>(`${this.apiUrl}/professores/${id}`, status)
      .pipe(take(1));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/professores/${id}`)
      .pipe(take(1));
  }
}
