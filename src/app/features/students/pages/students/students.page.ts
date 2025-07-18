import { Component } from '@angular/core';
import { TableStudentsComponent } from '@features/students/components/table-students/table-students.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';
import { HeaderStudentsComponent } from '@features/students/components/header-students/header-students.component';

@Component({
  selector: 'app-students',
  imports: [
    TableStudentsComponent,
    PagesLayoutComponent,
    HeaderStudentsComponent,
  ],
  templateUrl: './students.page.html',
  styleUrl: './students.page.css',
})
export class StudentsPage {}
