import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { iInscricao } from '@shared/models/inscricao.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscricoesService {
  private http = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAllByProject(id: string): Observable<iInscricao[]> {
    return this.http
      .get<iInscricao[]>(`${this.apiUrl}/projetos/${id}/inscricoes/`)
      .pipe(take(1));
  }
}
