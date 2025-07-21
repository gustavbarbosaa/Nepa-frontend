import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iProject } from '@shared/models/project.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAll(status?: string, id?: string): Observable<iProject[]> {
    if (status !== undefined && id !== undefined) {
      return this.http
        .get<iProject[]>(`${this.apiUrl}/projetos?status=${status}&id=${id}`)
        .pipe(take(1));
    }

    if (status !== undefined && id === undefined) {
      return this.http
        .get<iProject[]>(`${this.apiUrl}/projetos?status=${status}`)
        .pipe(take(1));
    }

    if (status === undefined && id !== undefined) {
      return this.http
        .get<iProject[]>(`${this.apiUrl}/projetos?id=${id}`)
        .pipe(take(1));
    }

    return this.http.get<iProject[]>(`${this.apiUrl}/projetos/`).pipe(take(1));
  }

  getById(id: string): Observable<iProject> {
    return this.http
      .get<iProject>(`${this.apiUrl}/projetos/${id}`)
      .pipe(take(1));
  }

  getByUser(): Observable<iProject[]> {
    return this.http
      .get<iProject[]>(`${this.apiUrl}/projetos/me`)
      .pipe(take(1));
  }

  editProject(id: string, status: string): Observable<iProject> {
    return this.http
      .patch<iProject>(`${this.apiUrl}/projetos/${id}`, status)
      .pipe(take(1));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/projetos/${id}`)
      .pipe(take(1));
  }
}
