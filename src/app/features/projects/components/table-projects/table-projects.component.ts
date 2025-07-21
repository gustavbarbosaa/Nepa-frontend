import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { NgxMaskPipe } from 'ngx-mask';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-table-projects',
  imports: [
    TableListItemsComponent,
    ButtonComponent,
    Dialog,
    TableModule,
    ToastModule,
    Tag,
    CommonModule,
    NgIcon,
    NgxMaskPipe,
  ],
  templateUrl: './table-projects.component.html',
  styleUrl: './table-projects.component.css',
  viewProviders: [provideIcons({ heroPencil, heroTrash })],
  providers: [ToastService, MessageService],
})
export class TableProjectsComponent {}
