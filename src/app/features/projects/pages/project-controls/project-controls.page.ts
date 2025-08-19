import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlService } from '@features/controls/services/control.service';
import { ProjectService } from '@features/projects/services/project/project.service';
import { iControl } from '@shared/models/control.model';
import { iProject } from '@shared/models/project.model';
import { forkJoin } from 'rxjs';
import { PagesLayoutComponent } from '@shared/components/pages-layout/pages-layout.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';

@Component({
  selector: 'app-project-controls',
  imports: [PagesLayoutComponent, TitleHeaderListComponent],
  templateUrl: './project-controls.page.html',
  styleUrl: './project-controls.page.css',
})
export class ProjectControlsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private controlService = inject(ControlService);

  projectId = this.route.snapshot.paramMap.get('projectId');
  project = signal<iProject | null>(null);
  controls = signal<iControl[]>([]);

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
        this.project.set(project);
        this.controls.set(controls);
        console.log('Projeto e controles carregados com sucesso:', {
          project,
          controls,
        });
      },
      error: err => console.error('Erro ao carregar dados: ', err),
    });
  }

  private nameMonth(month: number): string {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return months[month - 1] || '';
  }

  formatDate(month: number, year: number): string {
    return `${this.nameMonth(month)} / ${year}`;
  }
}
