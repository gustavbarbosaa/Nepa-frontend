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
import { eProjectStatus } from '@features/projects/enums/status.enum';
import { ProjectSignalService } from '@features/projects/services/project-signal/project-signal.service';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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
  private courseService = inject(CourseService);

  statusFilter: WritableSignal<{ label: string; value: string }[]> = signal([]);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filterTitle: ['', [Validators.nullValidator]],
      filterStatus: [''],
    });

    this.statusFilter.set([
      { label: 'Todos', value: '' },
      ...Object.entries(eProjectStatus).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ]);

    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(({ filterTitle, filterStatus }) => {
        this.projectServiceSignal.filterTitle.set(filterTitle || '');
        this.projectServiceSignal.filterStatus.set(filterStatus || '');
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
