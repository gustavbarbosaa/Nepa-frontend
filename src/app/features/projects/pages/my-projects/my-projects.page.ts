import { Component } from '@angular/core';
import { HeaderProjectsComponent } from '@features/projects/components/header-projects/header-projects.component';
import { TableMyProjectsComponent } from '@features/projects/components/table-my-projects/table-my-projects.component';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';

@Component({
  selector: 'app-my-projects',
  imports: [
    HeaderProjectsComponent,
    TableMyProjectsComponent,
    PagesLayoutComponent,
  ],
  templateUrl: './my-projects.page.html',
  styleUrl: './my-projects.page.css',
})
export class MyProjectsPage {}
