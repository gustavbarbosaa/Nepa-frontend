import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@core/services/toast/toast.service';
import { SubscriptionsService } from '@features/subscriptions/services/subscriptions/subscriptions.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { iInscricao } from '@shared/models/inscricao.model';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-table-subscriptions',
  imports: [
    TableListItemsComponent,
    ButtonModule,
    TagModule,
    Dialog,
    Toast,
    ButtonComponent,
  ],
  templateUrl: './table-subscriptions.component.html',
  styleUrl: './table-subscriptions.component.css',
  providers: [ToastService, MessageService],
})
export class TableSubscriptionsComponent implements OnInit {
  private subscriptionsService = inject(SubscriptionsService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  loading = signal<boolean>(false);
  subscriptionsInProject = signal<iInscricao[]>([]);
  subscriptionSelected = signal<iInscricao | null>(null);
  visibleApprove = signal<boolean>(false);
  visibleRepprove = signal<boolean>(false);

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.fetchSubscriptionsWithDetails(projectId);
    } else {
      console.error('Erro ao buscar alunos inscritos no projeto!');
    }
  }

  fetchSubscriptionsWithDetails(projectId: string): void {
    this.subscriptionsService.getAllByProject(projectId).subscribe({
      next: response => {
        this.subscriptionsInProject.set(response);
      },
      error: error => console.error(error),
    });
  }

  showApproveDialog(subscription: iInscricao): void {
    this.subscriptionSelected.set(subscription);
    this.visibleApprove.set(true);
  }

  showRepproveDialog(subscription: iInscricao): void {
    this.subscriptionSelected.set(subscription);
    this.visibleRepprove.set(true);
  }
}
