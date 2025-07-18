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
import { StudentSignalService } from '@features/students/services/student-signal/student-signal.service';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { TitleHeaderListComponent } from '@shared/components/title-header-list/title-header-list.component';

@Component({
  selector: 'app-header-students',
  imports: [TitleHeaderListComponent, InputFormComponent, SelectFormComponent],
  templateUrl: './header-students.component.html',
  styleUrl: './header-students.component.css',
})
export class HeaderStudentsComponent implements OnInit {
  form!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private studentServiceSignal = inject(StudentSignalService);

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
      console.log('Form value changed:', value);
      this.studentServiceSignal.filterName.set(value.filterName);
      this.studentServiceSignal.filterStatus.set(value.filterStatus);
    });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }
}
