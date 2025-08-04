import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { eProjectStatus } from '@features/projects/enums/status.enum';
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

  getSubscriptionByIdProject(
    idProject: string,
    idSubscription: string
  ): Observable<iInscricao> {
    return this.http
      .get<iInscricao>(
        `${this.apiUrl}/projetos/${idProject}/inscricoes/${idSubscription}/`
      )
      .pipe(take(1));
  }

  subscribeInTheProject(id: string): Observable<iInscricao> {
    return this.http
      .post<iInscricao>(`${this.apiUrl}/projetos/${id}/inscricoes/`, id)
      .pipe(take(1));
  }

  verifyStatusStudentInTheProject(
    idProject: string,
    idSubscription: string,
    status: { status: eProjectStatus }
  ): Observable<iInscricao> {
    return this.http
      .patch<iInscricao>(
        `${this.apiUrl}/projetos/${idProject}/inscricoes/${idSubscription}/`,
        status
      )
      .pipe(take(1));
  }
}
