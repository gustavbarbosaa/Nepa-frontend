import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { TeacherSignalService } from '@features/teachers/services/teacher-signal/teacher-signal.service';
import { TeacherService } from '@features/teachers/services/teacher/teacher.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { iTeacher } from '@shared/models/teacher.model';
import { NgxMaskPipe } from 'ngx-mask';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Tag } from 'primeng/tag';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-table-teacher',
  imports: [
    TableListItemsComponent,
    ButtonModule,
    ButtonComponent,
    Toast,
    Dialog,
    Tag,
    NgxMaskPipe,
  ],
  templateUrl: './table-teacher.component.html',
  styleUrl: './table-teacher.component.css',
  providers: [ToastService, MessageService],
})
export class TableTeacherComponent implements OnInit {
  private teacherService = inject(TeacherService);
  private teacherSignalService = inject(TeacherSignalService);
  private toastService = inject(ToastService);

  allTeachers = signal<iTeacher[]>([]);
  selectedTeacher = signal<iTeacher | null>(null);
  visibleDelete = signal<boolean>(false);
  visibleApprove = signal<boolean>(false);
  loading = signal<boolean>(false);

  teachers = computed(() => {
    const name = this.teacherSignalService.filterName().toLowerCase();
    const status = this.teacherSignalService.filterStatus();

    return this.allTeachers().filter(teacher => {
      const matchNames = teacher.nome.toLowerCase().includes(name);
      const matchesStatus =
        status === '' ||
        (status === 'ativo' && teacher.ativo === true) ||
        (status === 'inativo' && teacher.ativo === false);

      return matchNames && matchesStatus;
    });
  });

  constructor() {
    effect(() => {
      this.teacherSignalService.refresh$();
      this.fetchTeachers();
    });
  }

  ngOnInit(): void {
    this.fetchTeachers();
  }

  fetchTeachers(): void {
    this.teacherService.getAll().subscribe({
      next: res => {
        this.allTeachers.set(res);
      },
      error: err => console.error('Erro ao buscar professores: ', err),
    });
  }

  showDeleteDialog(teacher: iTeacher): void {
    this.selectedTeacher.set(teacher);
    this.visibleDelete.set(true);
  }

  showApproveDialog(teacher: iTeacher): void {
    this.selectedTeacher.set(teacher);
    this.visibleApprove.set(true);
  }

  approveTeacher(): void {
    const teacher = this.verifyTeacherSelected();

    this.teacherService.edit(teacher!.id, { ativo: true }).subscribe({
      next: () => {
        this.fetchTeachers();
        this.toastService.showSuccess(
          'Ativação realizada com sucesso!',
          'Sucesso'
        );

        setInterval(() => {
          this.visibleApprove.set(false);
        }, 2000);
      },
      error: error => {
        this.toastService.showError(
          'Houve um erro ao aceitar o professor!',
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

  deleteTeacher(): void {
    const teacher = this.verifyTeacherSelected();

    this.teacherService.delete(teacher!.id).subscribe({
      next: () => {
        this.fetchTeachers();
        this.loading.set(false);
        this.visibleDelete.set(false);
        this.toastService.showSuccess(
          'Professor excluído com sucesso!',
          'Sucesso!'
        );
      },
      error: error => {
        this.toastService.showError(
          'Houve um erro ao excluir o professor!',
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

  verifyTeacherSelected(): iTeacher | null {
    this.loading.set(true);
    const teacher = this.selectedTeacher();
    if (!teacher) return null;

    return teacher;
  }
}
