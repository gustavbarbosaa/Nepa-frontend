import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iStudent } from '@shared/models/student.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAll(active?: boolean): Observable<iStudent[]> {
    if (active !== undefined) {
      return this.http
        .get<iStudent[]>(`${this.apiUrl}/alunos?ativo=${active}`)
        .pipe(take(1));
    }

    return this.http.get<iStudent[]>(`${this.apiUrl}/alunos/`).pipe(take(1));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/alunos/${id}`).pipe(take(1));
  }
}
