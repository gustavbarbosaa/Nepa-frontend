import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  effect,
  WritableSignal,
} from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { ProjectStatus } from '@features/projects/enums/status.enum';
import { ProjectSignalService } from '@features/projects/services/project-signal/project-signal.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCheck,
  heroDocumentText,
  heroPencil,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { iProject } from '@shared/models/project.model';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-table-my-projects',
  imports: [
    ButtonModule,
    TableListItemsComponent,
    TableModule,
    ToastModule,
    Tag,
    CommonModule,
    NgIcon,
  ],
  templateUrl: './table-my-projects.component.html',
  styleUrl: './table-my-projects.component.css',
  viewProviders: [
    provideIcons({ heroPencil, heroTrash, heroCheck, heroDocumentText }),
  ],
  providers: [ToastService, MessageService],
})
export class TableMyProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  private projectSignalService = inject(ProjectSignalService);

  allProjects = signal<iProject[]>([]);
  loading = signal<boolean>(false);

  statusProject: WritableSignal<{ label: string; value: string }[]> = signal(
    []
  );

  projects = computed(() => {
    const title = this.projectSignalService.filterTitle().toLowerCase();
    const status = this.projectSignalService.filterStatus();

    return this.allProjects().filter(project => {
      const matchesTitle = project.titulo.toLowerCase().includes(title);
      const matchesStatus = !status || project.status === status;

      return matchesTitle && matchesStatus;
    });
  });

  constructor() {
    effect(() => {
      this.projectSignalService.refresh$();
      this.fetchProjects();
    });
  }

  ngOnInit(): void {
    this.fetchProjects();

    this.statusProject.set([
      ...Object.entries(ProjectStatus).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ]);
  }

  fetchProjects(): void {
    this.projectService.getByUser().subscribe({
      next: res => {
        this.allProjects.set(res);
      },
      error: err => console.error('Erro ao buscar projetos: ', err),
    });
  }
  private formatStatusLabel(status: string): string {
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
