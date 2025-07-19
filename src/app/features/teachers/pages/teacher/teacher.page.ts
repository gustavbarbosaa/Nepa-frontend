import { Component } from '@angular/core';
import { HeaderTeacherComponent } from '@features/teachers/components/header-teacher/header-teacher.component';
import { TableTeacherComponent } from '@features/teachers/components/table-teacher/table-teacher.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';

@Component({
  selector: 'app-teacher',
  imports: [
    HeaderTeacherComponent,
    TableTeacherComponent,
    PagesLayoutComponent,
  ],
  templateUrl: './teacher.page.html',
  styleUrl: './teacher.page.css',
})
export class TeacherPage {}
