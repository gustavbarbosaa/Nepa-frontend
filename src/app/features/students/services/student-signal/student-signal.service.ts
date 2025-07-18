import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentSignalService {
  private refreshSignal = signal(0);
  filterName = signal<string>('');
  filterStatus = signal<boolean>(false);

  refresh$ = this.refreshSignal.asReadonly();

  triggerRefresh(): void {
    this.refreshSignal.update(v => v + 1);
  }
}
