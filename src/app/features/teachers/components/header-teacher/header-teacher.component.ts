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
import { TeacherSignalService } from '@features/teachers/services/teacher-signal/teacher-signal.service';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';

@Component({
  selector: 'app-header-teacher',
  imports: [TitleHeaderListComponent, InputFormComponent, SelectFormComponent],
  templateUrl: './header-teacher.component.html',
  styleUrl: './header-teacher.component.css',
})
export class HeaderTeacherComponent implements OnInit {
  form!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private teacherSignalService = inject(TeacherSignalService);

  statusFilter: WritableSignal<{ label: string; value: string }[]> = signal([]);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filterName: ['', [Validators.nullValidator]],
      filterStatus: [''],
    });

    this.statusFilter.set([
      { label: 'Todos', value: '' },
      { label: 'Ativos', value: 'ativo' },
      { label: 'Inativos', value: 'inativo' },
    ]);

    this.form.valueChanges.subscribe(value => {
      this.teacherSignalService.filterName.set(value.filterName);
      this.teacherSignalService.filterStatus.set(value.filterStatus);
    });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }
}
