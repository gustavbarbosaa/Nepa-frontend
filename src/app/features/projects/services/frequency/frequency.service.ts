import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iFrequency } from '@shared/models/frequency.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrequencyService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAll(
    control_id: string,
    held_ind: Date,
    control_month_id: string
  ): Observable<iFrequency[]> {
    const params = new HttpParams();

    if (held_ind)
      params.append(
        'realizada_em',
        held_ind.toISOString().split('T')[0] + 'T00:00:00.000Z'
      );

    if (control_month_id) params.append('controle_mensal_id', control_month_id);

    return this.http.get<iFrequency[]>(
      `${this.apiUrl}/controles/${control_id}/frequencias/`,
      { params }
    );
  }

  save(control_id: string, data: FormData): Observable<iFrequency> {
    return this.http.post<iFrequency>(
      `${this.apiUrl}/controles/${control_id}/frequencias/`,
      data
    );
  }
}
