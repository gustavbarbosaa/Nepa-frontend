import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  showToast(
    severity: ToastSeverity,
    detailMessage: string,
    summary: string = 'Sucesso'
  ): void {
    this.messageService.add({
      severity: severity,
      summary,
      detail: detailMessage,
    });
  }

  showSuccess(detailMessage: string, summary?: string): void {
    this.showToast('success', detailMessage, summary);
  }

  showInfo(detailMessage: string, summary?: string): void {
    this.showToast('info', detailMessage, summary);
  }

  showWarn(detailMessage: string, summary?: string): void {
    this.showToast('warn', detailMessage, summary);
  }

  showError(detailMessage: string, summary?: string): void {
    this.showToast('error', detailMessage, summary);
  }
}
