import { Injectable, signal } from '@angular/core';
import { eProjectStatus } from '@features/projects/enums/status.enum';

@Injectable({
  providedIn: 'root',
})
export class ProjectSignalService {
  private refreshSignal = signal(0);
  filterTitle = signal<string>('');
  filterStatus = signal<eProjectStatus | ''>('');

  refresh$ = this.refreshSignal.asReadonly();

  triggerRefresh(): void {
    this.refreshSignal.update(v => v + 1);
  }
}
