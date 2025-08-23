import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlService } from '@features/controls/services/control.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { iControl } from '@shared/models/control.model';
import { iProject } from '@shared/models/project.model';
import { forkJoin } from 'rxjs';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';
import { Dialog } from 'primeng/dialog';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { Button } from 'primeng/button';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ToastService } from '@core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { FormFrequencyComponent } from '@features/projects/components/form-frequency/form-frequency.component';

@Component({
  selector: 'app-project-controls',
  imports: [
    PagesLayoutComponent,
    TitleHeaderListComponent,
    Dialog,
    ButtonComponent,
    InputFormComponent,
    TableListItemsComponent,
    Button,
    Toast,
    FormFrequencyComponent,
  ],
  templateUrl: './project-controls.page.html',
  styleUrl: './project-controls.page.css',
  providers: [ToastService, MessageService],
})
export class ProjectControlsPage implements OnInit {
  form!: FormGroup;
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private controlService = inject(ControlService);
  private fb = inject(NonNullableFormBuilder);
  private toast = inject(ToastService);

  projectId = this.route.snapshot.paramMap.get('projectId');
  project = signal<iProject | null>(null);
  controls = signal<iControl[]>([]);
  loading = signal<boolean>(false);
  showDialog = signal<boolean>(false);
  showDeleteDialog = signal<boolean>(false);
  showFrequencyDialog = signal<boolean>(false);
  controlSelected = signal<iControl | null>(null);

  ngOnInit(): void {
    this.loadProjectAndControls();

    this.form = this.fb.group({
      projeto_id: [this.projectId, [Validators.required]],
      mes: [0, [Validators.required]],
      ano: [0, [Validators.required]],
    });
  }

  loadProjectAndControls(): void {
    if (!this.projectId) return;

    forkJoin([
      this.projectService.getById(this.projectId),
      this.controlService.getControls(null, null, this.projectId),
    ]).subscribe({
      next: ([project, controls]) => {
        this.project.set(project);
        this.controls.set(controls);
      },
      error: err => console.error('Erro ao carregar dados: ', err),
    });
  }

  private nameMonth(month: number): string {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return months[month - 1] || '';
  }

  formatDate(month?: number, year?: number): string {
    return `${this.nameMonth(month!)} / ${year}`;
  }

  createControl(): void {
    let value = this.form.value.mes;
    value = value.split('-');

    const controlData = {
      projeto_id: this.projectId!,
      mes: Number(value[1]),
      ano: Number(value[0]),
    };

    const formData = {
      ...this.form.value,
      ...controlData,
    };

    this.loading.set(true);
    this.form.patchValue(formData);

    if (this.form.invalid) {
      console.error('Formulário inválido:', this.form.errors);
      return;
    }

    this.controlService.post(formData).subscribe({
      next: control => {
        this.loading.set(false);
        this.toast.showSuccess('Controle criado com sucesso!', 'Sucesso');
        this.controls.set([...this.controls(), control]);
        this.showDialog.set(false);
        this.form.reset({ projeto_id: this.projectId, mes: null, ano: null });
        console.log('Controle criado com sucesso:', control);
      },
      error: err => {
        this.loading.set(false);
        this.toast.showError('Erro ao criar controle', 'Erro');
        console.error('Erro ao criar controle: ', err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  openDialog(): void {
    this.showDialog.set(true);
  }

  openDeleteDialog(control: iControl): void {
    this.controlSelected.set(control);
    this.showDeleteDialog.set(true);
  }

  openFrequencyDialog(control: iControl): void {
    this.controlSelected.set(control);
    this.showFrequencyDialog.set(true);
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  deleteControl(): void {
    this.loading.set(true);

    this.controlService.delete(this.controlSelected()!.id).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.showSuccess('Controle excluído com sucesso!', 'Sucesso');
        this.loadProjectAndControls();
        this.showDeleteDialog.set(false);
      },
      error: err => {
        this.loading.set(false);
        this.toast.showError('Erro ao excluir controle', 'Erro');
        console.error('Erro ao excluir controle: ', err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
