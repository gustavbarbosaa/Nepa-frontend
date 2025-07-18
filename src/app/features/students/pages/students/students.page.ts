import { Component } from '@angular/core';
import { TableStudentsComponent } from '@features/students/components/table-students/table-students.component';

@Component({
  selector: 'app-students',
  imports: [TableStudentsComponent],
  templateUrl: './students.page.html',
  styleUrl: './students.page.css',
})
export class StudentsPage {}
