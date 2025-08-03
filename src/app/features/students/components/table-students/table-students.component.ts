import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { StudentSignalService } from '@features/students/services/student-signal/student-signal.service';
import { StudentService } from '@features/students/services/student/student.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { iStudent } from '@shared/models/student.model';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { NgxMaskPipe } from 'ngx-mask';
import { Dialog } from 'primeng/dialog';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ToastService } from '@core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table-students',
  imports: [
    ButtonModule,
    ButtonComponent,
    Dialog,
    TableModule,
    ToastModule,
    Tag,
    CommonModule,
    NgIcon,
    NgxMaskPipe,
    TableListItemsComponent,
  ],
  templateUrl: './table-students.component.html',
  styleUrl: './table-students.component.css',
  viewProviders: [provideIcons({ heroPencil, heroTrash })],
  providers: [ToastService, MessageService],
})
export class TableStudentsComponent implements OnInit {
  private studentService = inject(StudentService);
  private studentSignalService = inject(StudentSignalService);
  private toastService = inject(ToastService);

  allStudents = signal<iStudent[]>([]);
  selectedStudent = signal<iStudent | null>(null);
  visibleDelete = signal<boolean>(false);
  loading = signal<boolean>(false);

  students = computed(() => {
    const name = this.studentSignalService.filterName().toLowerCase();
    const status = this.studentSignalService.filterStatus();

    return this.allStudents().filter(student => {
      const matchNames = student.nome.toLowerCase().includes(name);
      const matchesStatus =
        status === '' ||
        (status === 'ativo' && student.ativo === true) ||
        (status === 'inativo' && student.ativo === false);

      return matchNames && matchesStatus;
    });
  });

  constructor() {
    effect(() => {
      this.studentSignalService.refresh$();
      this.fetchStudents();
    });
  }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getAll().subscribe({
      next: res => {
        this.allStudents.set(res);
      },
      error: err => console.error('Erro ao buscar alunos: ', err),
    });
  }

  showDeleteDialog(student: iStudent): void {
    this.selectedStudent.set(student);
    this.visibleDelete.set(true);
  }

  deleteStudent(): void {
    this.loading.set(true);
    const student = this.selectedStudent();
    if (!student) return;

    this.studentService.delete(student.id).subscribe({
      next: () => {
        this.fetchStudents();
        this.loading.set(false);
        this.visibleDelete.set(false);
        this.toastService.showSuccess(
          'Aluno excluído com sucesso!',
          'Sucesso!'
        );
      },
      error: error => {
        this.toastService.showError(
          'Houve um erro ao excluir o aluno!',
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
