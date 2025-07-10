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
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { Tag } from 'primeng/tag';
import { NoticeSignalService } from '@features/notices/services/notice-signal/notice-signal.service';
import { iNoticeResponse } from '@shared/models/notice.model';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-table-notices',
  imports: [Dialog, TableModule, Tag, CommonModule, NgIcon],
  templateUrl: './table-notices.component.html',
  styleUrl: './table-notices.component.css',
  viewProviders: [provideIcons({ heroPencil, heroTrash })],
})
export class TableNoticesComponent implements OnInit {
  private noticeService = inject(NoticeService);
  private noticeSignalService = inject(NoticeSignalService);

  allNotices = signal<iNoticeResponse[]>([]);
  selectedNotice = signal<iNoticeResponse | null>(null);
  visible = signal(false);

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

  fetchNotices(): void {
    this.noticeService.getAll().subscribe({
      next: res => this.allNotices.set(res),
      error: err => console.error('Erro ao buscar editais: ', err),
    });
  }

  showDeleteDialog(notice: iNoticeResponse): void {
    this.selectedNotice.set(notice);
    this.visible.set(true);
  }

  deleteNotice(): void {
    const notice = this.selectedNotice();
    if (!notice) return;

    this.noticeService.delete(notice.id).subscribe({
      next: () => {
        this.fetchNotices();
        this.visible.set(false);
      },
      error: err => console.error('Erro ao excluir edital:', err),
    });
  }
}
