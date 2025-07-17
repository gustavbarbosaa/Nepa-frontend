import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentService } from '@features/students/services/student/student.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { ButtonComponent } from '@shared/components/button/button.component';
import { iStudent } from '@shared/models/student.model';
import { Dialog } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-table-students',
  imports: [Dialog, TableModule, Tag, CommonModule, NgIcon, ButtonComponent],
  templateUrl: './table-students.component.html',
  styleUrl: './table-students.component.css',
  viewProviders: [provideIcons({ heroPencil, heroTrash })],
})
export class TableStudentsComponent implements OnInit {
  private studentService = inject(StudentService);
  allStudents = signal<iStudent[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.loading.set(true);

    this.studentService.getStudents().subscribe({
      next: students => {
        this.loading.set(false);
        this.allStudents.set(students);
        console.log('Alunos carregados:', students);
      },
      error: err => {
        this.loading.set(false);
        console.error('Erro ao buscar alunos:', err);
      },
      complete: () => {
        this.loading.set(false);

        console.log('Busca de alunos concluída');
      },
    });
  }
}
