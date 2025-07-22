import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ProjectStatus } from '@features/projects/enums/status.enum';
import { ProjectSignalService } from '@features/projects/services/project-signal/project-signal.service';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';

@Component({
  selector: 'app-header-projects',
  imports: [TitleHeaderListComponent, InputFormComponent, SelectFormComponent],
  templateUrl: './header-projects.component.html',
  styleUrl: './header-projects.component.css',
})
export class HeaderProjectsComponent implements OnInit {
  form!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private projectServiceSignal = inject(ProjectSignalService);

  statusFilter: WritableSignal<{ label: string; value: string }[]> = signal([]);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filterTitle: ['', [Validators.nullValidator]],
      filterStatus: [''],
    });

    this.statusFilter.set([
      { label: 'Todos', value: '' },
      ...Object.entries(ProjectStatus).map(([key, value]) => ({
        label: this.formatStatusLabel(key),
        value: value,
      })),
    ]);

    this.form.valueChanges.subscribe(value => {
      this.projectServiceSignal.filterTitle.set(value.filterTitle);
      this.projectServiceSignal.filterStatus.set(value.filterStatus);
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
