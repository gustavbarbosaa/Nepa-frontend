import { Injectable, signal } from '@angular/core';
import { ProjectStatus } from '@shared/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectSignalService {
  private refreshSignal = signal(0);
  filterName = signal<string>('');
  filterStatus = signal<ProjectStatus | ''>('');

  refresh$ = this.refreshSignal.asReadonly();

  triggerRefresh(): void {
    this.refreshSignal.update(v => v + 1);
  }
}
