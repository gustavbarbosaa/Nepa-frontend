import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
  allStudents = signal<iStudent[]>([]);

  ngOnInit(): void {
    console.log('TableStudentsComponent initialized');
  }
}
