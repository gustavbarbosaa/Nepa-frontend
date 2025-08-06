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
import { forkJoin, map } from 'rxjs';

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
  private tokenService = inject(TokenService);
  private toastService = inject(ToastService);
  private formBuilder = inject(NonNullableFormBuilder);

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

  fetchProjects(): void {
    this.loading.set(true);
    const isStudent = this.userInfo()?.autoridade === this.autoridade.aluno;

    this.projectService.getAll().subscribe({
      next: projects => {
        if (isStudent) {
          this.allProjects.set(
            projects.map(p => ({ ...p, subscriptionStatus: null }))
          );
          this.loading.set(false);
        } else {
          const studentId = this.userInfo()?.sub;
          if (!studentId) {
            this.allProjects.set(projects);
            this.loading.set(false);
            return;
          }

          const subscriptionRequests = projects.map(project =>
            this.subscriptionService.getAllByProject(project.id).pipe(
              map(subscriptions => {
                const studentSubscription = subscriptions.find(
                  (sub: iInscricao) => sub.aluno_id === studentId
                );
                return {
                  ...project,
                  subscriptionStatus: studentSubscription
                    ? studentSubscription.status
                    : null,
                };
              })
            )
          );

          console.log('to aqui');
          subscriptionRequests.map(s => console.log(s));

          forkJoin(subscriptionRequests).subscribe({
            next: processedProjects => {
              this.allProjects.set(processedProjects);
              this.loading.set(false);
            },
            error: err => {
              console.error('Erro ao buscar inscrições para o Admin: ', err);
              this.toastService.showError(
                'Erro ao verificar inscrições.',
                'Ops!'
              );
              this.allProjects.set(
                projects.map(p => ({ ...p, subscriptionStatus: null }))
              );
              this.loading.set(false);
            },
          });
        }
      },
      error: err => {
        console.error('Erro ao buscar projetos: ', err);
        this.toastService.showError('Erro ao carregar projetos.', 'Ops!');
        this.loading.set(false);
      },
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
    this.loading.set(true);
    const project = this.selectedProject();
    if (!project) {
      this.loading.set(false);
      return;
    }

    // Condição para alunos: impede uma segunda inscrição,
    // pois o status só muda no refresh da página.
    if (project.subscriptionStatus !== null) {
      this.toastService.showInfo(
        'Você já tem uma inscrição para este projeto!',
        'Atenção!'
      );
      this.loading.set(false);
      this.visibleSubscription.set(false);
      return;
    }

    this.subscriptionService.subscribeInTheProject(project.id).subscribe({
      next: () => {
        // Após a inscrição bem-sucedida, atualize o estado localmente
        const currentProjects = this.allProjects();
        const updatedProjects = currentProjects.map(p => {
          if (p.id === project.id) {
            return {
              ...p,
              subscriptionStatus: eStatusInscricaoProjeto.PENDENTE,
            };
          }
          return p;
        });
        this.allProjects.set(updatedProjects);

        this.toastService.showSuccess(
          'Inscrição realizada com sucesso!',
          'Sucesso!'
        );
        this.visibleSubscription.set(false);
        this.loading.set(false);
      },
      error: error => {
        this.toastService.showError(
          'Houve um erro ao se inscrever no projeto!',
          'Ops!'
        );
        this.loading.set(false);
        console.error(error.error.message);
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
