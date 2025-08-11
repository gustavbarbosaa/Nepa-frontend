import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlService } from '@features/controls/services/control.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { iControl } from '@shared/models/control.model';
import { iProject } from '@shared/models/project.model';
import { forkJoin } from 'rxjs';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';

@Component({
  selector: 'app-project-controls',
  imports: [PagesLayoutComponent],
  templateUrl: './project-controls.component.html',
  styleUrl: './project-controls.component.css',
})
export class ProjectControlsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private controlService = inject(ControlService);

  projectId = this.route.snapshot.paramMap.get('projectId');
  project: iProject | null = null;
  controls: iControl[] = [];

  ngOnInit(): void {
    this.loadProjectAndControls();
  }

  loadProjectAndControls(): void {
    if (!this.projectId) return;

    forkJoin([
      this.projectService.getById(this.projectId),
      this.controlService.getControls(null, null, this.projectId),
    ]).subscribe({
      next: ([project, controls]) => {
        this.project = project;
        this.controls = controls;
      },
      error: err => console.error('Erro ao carregar dados: ', err),
    });
  }
}
