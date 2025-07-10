import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoticeSignalService {
  private refreshSignal = signal(0);
  filterName = signal<string>('');
  filterFile = signal<string>('');

  refresh$ = this.refreshSignal.asReadonly();

  triggerRefresh(): void {
    this.refreshSignal.update(v => v + 1);
  }
}
