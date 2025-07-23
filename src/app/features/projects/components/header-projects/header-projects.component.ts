import {
  Component,
  inject,
  input,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CourseService } from '@core/services/course/course.service';
import { ProjectStatus } from '@features/projects/enums/status.enum';
import { ProjectSignalService } from '@features/projects/services/project-signal/project-signal.service';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ProjectService } from '@features/projects/services/project/project.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-projects',
  imports: [
    TitleHeaderListComponent,
    InputFormComponent,
    SelectFormComponent,
    RouterLink,
  ],
  templateUrl: './header-projects.component.html',
  styleUrl: './header-projects.component.css',
})
export class HeaderProjectsComponent implements OnInit {
  isFiltered = input.required<boolean>();

  form!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private projectServiceSignal = inject(ProjectSignalService);
  private projectService = inject(ProjectService);
  private courseService = inject(CourseService);

  statusFilter: WritableSignal<{ label: string; value: string }[]> = signal([]);
  coursesFilter: Signal<{ label: string; value: string }[]>;

  constructor() {
    this.coursesFilter = toSignal(
      this.courseService
        .getAll()
        .pipe(
          map(courses => [
            { label: 'Todos os cursos', value: '' },
            ...courses.map(c => ({ label: c.nome, value: c.id })),
          ])
        ),
      { initialValue: [] }
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filterTitle: ['', [Validators.nullValidator]],
      filterStatus: [''],
      filterCourse: [''],
    });

    this.statusFilter.set([
      { label: 'Todos', value: '' },
      ...Object.entries(ProjectStatus).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ]);

    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(({ filterTitle, filterStatus, filterCourse }) => {
        this.projectServiceSignal.filterTitle.set(filterTitle || '');
        this.projectServiceSignal.filterStatus.set(filterStatus || '');
        this.projectServiceSignal.filterCourse.set(filterCourse || '');
      });
  }

  private formatStatusLabel(status: string): string {
    return status
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }
}
