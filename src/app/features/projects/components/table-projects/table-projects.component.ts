import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  OnInit,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ToastService } from '@core/services/toast/toast.service';
import { ProjectStatus } from '@features/projects/enums/status.enum';
import { ProjectSignalService } from '@features/projects/services/project-signal/project-signal.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { iProject } from '@shared/models/project.model';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-table-projects',
  imports: [
    TableListItemsComponent,
    ButtonModule,
    ButtonComponent,
    SelectFormComponent,
    Dialog,
    TableModule,
    ToastModule,
    Tag,
    CommonModule,
  ],
  templateUrl: './table-projects.component.html',
  styleUrl: './table-projects.component.css',
  providers: [ToastService, MessageService],
})
export class TableProjectsComponent implements OnInit {
  formStatus!: FormGroup;
  private projectService = inject(ProjectService);
  private projectSignalService = inject(ProjectSignalService);
  private toastService = inject(ToastService);
  private formBuilder = inject(NonNullableFormBuilder);

  allProjects = signal<iProject[]>([]);
  selectedProject = signal<iProject | null>(null);
  visibleDelete = signal<boolean>(false);
  visibleApprove = signal<boolean>(false);
  loading = signal<boolean>(false);

  statusProject: WritableSignal<{ label: string; value: string }[]> = signal(
    []
  );

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

    this.formStatus = this.formBuilder.group({
      status: ['APROVADO', [Validators.required]],
    });

    this.statusProject.set([
      ...Object.entries(ProjectStatus).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ]);
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

  showApproveDialog(project: iProject): void {
    this.selectedProject.set(project);
    this.visibleApprove.set(true);
  }

  approveProject(): void {
    this.loading.set(true);
    const project = this.selectedProject();
    if (!project) return;

    this.projectService.edit(project.id, this.formStatus.value).subscribe({
      next: () => {
        this.fetchProjects();
        this.loading.set(false);
        this.visibleApprove.set(false);
        this.toastService.showSuccess(
          'Projeto aprovado com sucesso!',
          'Sucesso!'
        );
      },
      error: error => {
        this.toastService.showError(
          'Houve um erro ao aprovar o projeto!',
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

  deleteProject(): void {
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

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.formStatus.get(controlName) as FormControl<T>;
  }

  private formatStatusLabel(status: string): string {
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
