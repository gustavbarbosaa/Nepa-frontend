import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { eStatusInscricaoProjeto } from '@shared/enums/status-inscricao.enum';
import { iInscricao } from '@shared/models/inscricao.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private http = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAllByProject(id: string, status?: string): Observable<iInscricao[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http
      .get<
        iInscricao[]
      >(`${this.apiUrl}/projetos/${id}/inscricoes/`, { params })
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

  approveOrRepproveSubscription(
    idProject: string,
    idSubscription: string,
    status: { status: eStatusInscricaoProjeto }
  ): Observable<iInscricao> {
    return this.http
      .patch<iInscricao>(
        `${this.apiUrl}/projetos/${idProject}/inscricoes/${idSubscription}`,
        status
      )
      .pipe(take(1));
  }
}
