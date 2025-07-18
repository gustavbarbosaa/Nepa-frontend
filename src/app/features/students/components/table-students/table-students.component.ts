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
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-table-students',
  imports: [
    TableModule,
    Tag,
    CommonModule,
    NgIcon,
    ScrollPanelModule,
    NgxMaskPipe,
  ],
  templateUrl: './table-students.component.html',
  styleUrl: './table-students.component.css',
  viewProviders: [provideIcons({ heroPencil, heroTrash })],
})
export class TableStudentsComponent implements OnInit {
  private studentService = inject(StudentService);
  private studentSignalService = inject(StudentSignalService);

  allStudents = signal<iStudent[]>([]);
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
    this.studentService.getStudents().subscribe({
      next: res => {
        this.allStudents.set(res);
        console.log('Alunos carregados com sucesso!', res);
      },
      error: err => console.error('Erro ao buscar alunos: ', err),
    });
  }
}
