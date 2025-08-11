import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iProject } from '@shared/models/project.model';
import { forkJoin, map, Observable, switchMap, take } from 'rxjs';
import { ControlService } from '../../../controls/services/control.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private controlService = inject(ControlService);

  getAll(status?: string, id?: string): Observable<iProject[]> {
    let params = new HttpParams();
    if (status) params = params.append('status', status);
    if (id) params = params.append('curso_id', id);

    return this.http
      .get<iProject[]>(`${this.apiUrl}/projetos/`, { params })
      .pipe(take(1));
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

  getProjectWithControls(): Observable<iProject[]> {
    return this.getByUser().pipe(
      switchMap(projects => {
        return forkJoin(
          projects.map(project =>
            this.controlService
              .getControls(null, null, project.id)
              .pipe(map(controls => ({ ...project, controls })))
          )
        );
      })
    );
  }

  post(form: FormData): Observable<iProject> {
    return this.http
      .post<iProject>(`${this.apiUrl}/projetos/`, form)
      .pipe(take(1));
  }

  edit(id: string, status: string): Observable<iProject> {
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
