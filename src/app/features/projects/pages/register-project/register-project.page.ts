import { Component } from '@angular/core';
import { FormProjectsComponent } from '@features/projects/components/form-projects/form-projects.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';

@Component({
  selector: 'app-register-project',
  imports: [
    FormProjectsComponent,
    PagesLayoutComponent,
    TitleHeaderListComponent,
  ],
  templateUrl: './register-project.page.html',
  styleUrl: './register-project.page.css',
})
export class RegisterProjectPage {}
