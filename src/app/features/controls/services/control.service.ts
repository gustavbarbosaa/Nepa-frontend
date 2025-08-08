import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iControl } from '@shared/models/control.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getControls(
    ano: number,
    mes: number,
    project_id: string
  ): Observable<iControl[]> {
    let params = new HttpParams();
    if (ano) params = params.append('ano', ano);
    if (mes) params = params.append('mes', mes);
    if (project_id) params = params.append('projeto_id', project_id);

    return this.http
      .get<iControl[]>(`${this.apiUrl}/controles/`, { params })
      .pipe(take(1));
  }
}
