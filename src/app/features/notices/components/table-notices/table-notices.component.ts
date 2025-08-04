import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NoticeService } from '@features/notices/services/notice/notice.service';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { NoticeSignalService } from '@features/notices/services/notice-signal/notice-signal.service';
import { iNoticeResponse } from '@shared/models/notice.model';
import { Dialog } from 'primeng/dialog';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InsertFileComponent } from '../insert-file/insert-file.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { ToastService } from '@core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '@core/services/token/token.service';
import { eAutoridade } from '@shared/enums/autoridade.enum';

@Component({
  selector: 'app-table-notices',
  imports: [
    Dialog,
    TableModule,
    Tag,
    CommonModule,
    ButtonComponent,
    ButtonModule,
    InsertFileComponent,
    TableListItemsComponent,
    Toast,
  ],
  templateUrl: './table-notices.component.html',
  styleUrl: './table-notices.component.css',
  providers: [MessageService, ToastService],
})
export class TableNoticesComponent implements OnInit {
  private noticeService = inject(NoticeService);
  private noticeSignalService = inject(NoticeSignalService);
  private toastService = inject(ToastService);
  private tokenService = inject(TokenService);

  allNotices = signal<iNoticeResponse[]>([]);
  selectedNotice = signal<iNoticeResponse | null>(null);
  visibleDelete = signal<boolean>(false);
  visibleEdit = signal<boolean>(false);
  loading = signal<boolean>(false);
  userInfo = signal(this.tokenService.getNameAndTypeUserForToken());
  autoridade = eAutoridade;

  notices = computed(() => {
    const name = this.noticeSignalService.filterName().toLowerCase();
    const file = this.noticeSignalService.filterFile();

    return this.allNotices().filter(notice => {
      const matchesName = notice.nome.toLowerCase().includes(name);
      const matchesFile =
        file === '' ||
        (file === 'com_arquivo' && notice.caminho_arquivo !== null) ||
        (file === 'sem_arquivo' && notice.caminho_arquivo === null);

      return matchesName && matchesFile;
    });
  });

  constructor() {
    effect(() => {
      this.noticeSignalService.refresh$();
      this.fetchNotices();
    });
  }

  ngOnInit(): void {
    this.fetchNotices();
  }

  onSuccessEdit(): void {
    this.visibleEdit.set(false);
  }

  openPDFNotice(notice: iNoticeResponse): void {
    if (!notice) return;

    this.noticeService.getBySlug(notice.slug).subscribe({
      next: (blob: any) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: () =>
        this.toastService.showError(
          'Não foi possível abrir este edital',
          'Erro'
        ),
    });
  }

  fetchNotices(): void {
    this.noticeService.getAll().subscribe({
      next: res => this.allNotices.set(res),
      error: err => console.error('Erro ao buscar editais: ', err),
    });
  }

  showEditDialog(notice: iNoticeResponse): void {
    this.selectedNotice.set(notice);
    this.visibleEdit.set(true);
  }

  showDeleteDialog(notice: iNoticeResponse): void {
    this.selectedNotice.set(notice);
    this.visibleDelete.set(true);
  }

  deleteNotice(): void {
    this.loading.set(true);
    const notice = this.selectedNotice();
    if (!notice) return;

    this.noticeService.delete(notice.id).subscribe({
      next: () => {
        this.fetchNotices();
        this.loading.set(false);
        this.visibleDelete.set(false);
      },
      error: err => {
        this.loading.set(false);
        this.toastService.showError('Erro ao excluir edital!', 'Erro');
        console.error('Erro ao excluir edital:', err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
