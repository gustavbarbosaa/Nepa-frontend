import { Component } from '@angular/core';
import { TableProjectsComponent } from '@features/projects/components/table-projects/table-projects.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';

@Component({
  selector: 'app-projects',
  imports: [PagesLayoutComponent, TableProjectsComponent],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.css',
})
export class ProjectsPage {}
