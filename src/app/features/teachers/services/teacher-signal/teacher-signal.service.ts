import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeacherSignalService {
  private refreshSignal = signal(0);
  filterName = signal<string>('');
  filterStatus = signal<string>('');

  refresh$ = this.refreshSignal.asReadonly();

  triggerRefresh(): void {
    this.refreshSignal.update(v => v + 1);
  }
}
