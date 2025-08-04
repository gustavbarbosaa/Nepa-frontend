import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ToastService } from '@core/services/toast/toast.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { StudentSignalService } from '@features/students/services/student-signal/student-signal.service';
import { StudentService } from '@features/students/services/student/student.service';
import { TableListItemsComponent } from '@shared/components/table-list-items/table-list-items.component';
import { iStudent } from '@shared/models/student.model';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-table-students-in-project',
  imports: [Toast, TableListItemsComponent],
  templateUrl: './table-students-in-project.component.html',
  styleUrl: './table-students-in-project.component.css',
  providers: [ToastService, MessageService],
})
export class TableStudentsInProjectComponent implements OnInit {
  private projectService = inject(ProjectService);
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
}
