import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { ProjectSignalService } from '@features/projects/services/project-signal/project-signal.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheck, heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { iProject } from '@shared/models/project.model';
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
  ],
  templateUrl: './table-projects.component.html',
  styleUrl: './table-projects.component.css',
  viewProviders: [provideIcons({ heroPencil, heroTrash, heroCheck })],
  providers: [ToastService, MessageService],
})
export class TableProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
  private projectSignalService = inject(ProjectSignalService);
  private toastService = inject(ToastService);

  allProjects = signal<iProject[]>([]);
  selectedProject = signal<iProject | null>(null);
  visibleDelete = signal<boolean>(false);
  loading = signal<boolean>(false);

  projects = computed(() => {
    const title = this.projectSignalService.filterTitle().toLowerCase();
    const status = this.projectSignalService.filterStatus();
    const courseId = this.projectSignalService.filterCourse();

    return this.allProjects().filter(project => {
      const matchesTitle = project.titulo.toLowerCase().includes(title);
      const matchesStatus = !status || project.status === status;
      const matchesCourse = !courseId || project.id === courseId;

      return matchesTitle && matchesStatus && matchesCourse;
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
  }

  fetchProjects(): void {
    this.projectService.getAll().subscribe({
      next: res => {
        this.allProjects.set(res);
      },
      error: err => console.error('Erro ao buscar projetos: ', err),
    });
  }

  showDeleteDialog(project: iProject): void {
    this.selectedProject.set(project);
    this.visibleDelete.set(true);
  }

  deleteStudent(): void {
    this.loading.set(true);
    const project = this.selectedProject();
    if (!project) return;

    this.projectService.delete(project.id).subscribe({
      next: () => {
        this.fetchProjects();
        this.loading.set(false);
        this.visibleDelete.set(false);
        this.toastService.showSuccess(
          'Projeto excluído com sucesso!',
          'Sucesso!'
        );
      },
      error: error => {
        this.toastService.showError(
          'Houve um erro ao excluir o projeto!',
          'Ops!'
        );
        this.loading.set(false);
        console.error(error.error.message);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
