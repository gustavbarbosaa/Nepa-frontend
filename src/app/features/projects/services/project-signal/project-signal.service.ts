import { Injectable, signal } from '@angular/core';
import { ProjectStatus } from '@features/projects/enums/status.enum';

@Injectable({
  providedIn: 'root',
})
export class ProjectSignalService {
  private refreshSignal = signal(0);
  filterTitle = signal<string>('');
  filterStatus = signal<ProjectStatus | ''>('');

  refresh$ = this.refreshSignal.asReadonly();

  triggerRefresh(): void {
    this.refreshSignal.update(v => v + 1);
  }
}
