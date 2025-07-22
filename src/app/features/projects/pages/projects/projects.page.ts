import { Component } from '@angular/core';
import { TableProjectsComponent } from '@features/projects/components/table-projects/table-projects.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';
import { HeaderProjectsComponent } from '@features/projects/components/header-projects/header-projects.component';

@Component({
  selector: 'app-projects',
  imports: [
    PagesLayoutComponent,
    TableProjectsComponent,
    HeaderProjectsComponent,
  ],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.css',
})
export class ProjectsPage {}
