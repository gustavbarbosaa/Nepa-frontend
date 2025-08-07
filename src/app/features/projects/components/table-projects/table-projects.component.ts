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
import { TokenService } from '@core/services/token/token.service';
import { eProjectStatus } from '@features/projects/enums/status.enum';
import { ProjectSignalService } from '@features/projects/services/project-signal/project-signal.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { StudentService } from '@features/students/services/student/student.service';
import { SubscriptionsService } from '@features/subscriptions/services/subscriptions/subscriptions.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { eAutoridade } from '@shared/enums/autoridade.enum';
import { eStatusInscricaoProjeto } from '@shared/enums/status-inscricao.enum';
import { iInscricao } from '@shared/models/inscricao.model';
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
  private subscriptionService = inject(SubscriptionsService);
  private studentService = inject(StudentService);
  private tokenService = inject(TokenService);
  private toastService = inject(ToastService);
  private formBuilder = inject(NonNullableFormBuilder);

  projectsSubscribed = signal<iInscricao[]>([]);
  allProjects = signal<iProject[]>([]);
  selectedProject = signal<iProject | null>(null);
  visibleDelete = signal<boolean>(false);
  visibleApprove = signal<boolean>(false);
  visibleSubscription = signal<boolean>(false);
  userInfo = signal(this.tokenService.getNameAndTypeUserForToken());
  autoridade = eAutoridade;
  statusProjeto = eProjectStatus;
  statusInscricao = eStatusInscricaoProjeto;
  loading = signal<boolean>(false);

  statusProject: WritableSignal<{ label: string; value: string }[]> = signal(
    []
  );

  projectsWithSubscriptionStatus = computed(() => {
    const subscribedProjects = this.projectsSubscribed();
    return this.allProjects().map(project => {
      const subscription = subscribedProjects.find(
        sub => sub.projeto_id === project.id
      );
      return {
        ...project,
        subscriptionStatus: subscription ? subscription.status : null,
      };
    });
  });

  projects = computed(() => {
    const title = this.projectSignalService.filterTitle().toLowerCase();
    const status = this.projectSignalService.filterStatus();
    const courseId = this.projectSignalService.filterCourse();

    return this.projectsWithSubscriptionStatus().filter(project => {
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
      if (this.userInfo()?.autoridade === this.autoridade.aluno) {
        this.fetchProjectsSubscribed();
      }
    });
  }

  ngOnInit(): void {
    this.fetchProjects();

    this.formStatus = this.formBuilder.group({
      status: ['Aprovado', [Validators.required]],
    });

    const statusOptions = [
      { label: 'Selecione o status', value: '' },
      ...Object.entries(eProjectStatus).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ];

    this.statusProject.set(statusOptions);
  }

  fetchProjectsSubscribed(): void {
    this.studentService.getRegisteredProjects().subscribe({
      next: response => {
        this.projectsSubscribed.set(response);
      },
      error: error => console.error(error),
    });
  }

  fetchProjects(): void {
    this.loading.set(true);

    this.projectService.getAll().subscribe({
      next: response => {
        this.loading.set(false);
        this.allProjects.set(response);
        this.fetchProjectsSubscribed();
      },
      error: error => {
        console.error(error);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  showDeleteDialog(project: iProject): void {
    this.selectedProject.set(project);
    this.visibleDelete.set(true);
  }

  showApproveDialog(project: iProject): void {
    this.formStatus.setValue({
      status: this.unformatStatusLabel(project.status),
    });

    this.selectedProject.set(project);
    this.visibleApprove.set(true);
  }

  showSubscriptionDialog(project: iProject): void {
    this.selectedProject.set(project);
    this.visibleSubscription.set(true);
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

  subscribeInProject(): void {
    if (!this.selectedProject()) {
      return;
    }

    this.loading.set(true);

    this.subscriptionService
      .subscribeInTheProject(this.selectedProject()!.id)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.toastService.showSuccess(
            'Inscrição realizada com sucesso!',
            'Sucesso'
          );

          setInterval(() => {
            this.visibleSubscription.set(false);
            this.fetchProjects();
          }, 2000);
        },
        error: error => {
          this.loading.set(false);
          this.toastService.showError('Erro ao realizar inscrição!', 'Erro');
          console.error(error);
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

  private unformatStatusLabel(formattedStatus: string): string {
    return formattedStatus.toUpperCase().replace(/ /g, '_');
  }
}
