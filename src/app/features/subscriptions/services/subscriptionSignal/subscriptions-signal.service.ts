import { Injectable, signal } from '@angular/core';
import { eStatusInscricaoProjeto } from '@shared/enums/status-inscricao.enum';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsSignalService {
  private refreshSignal = signal(0);
  filterName = signal<string>('');
  filterStatus = signal<eStatusInscricaoProjeto | ''>('');

  refresh$ = this.refreshSignal.asReadonly();

  triggerRefresh(): void {
    this.refreshSignal.update(v => v + 1);
  }
}
