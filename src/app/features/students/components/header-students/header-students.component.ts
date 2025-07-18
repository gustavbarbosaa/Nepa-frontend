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

  statusFilter: WritableSignal<{ label: string; value: string }[]> = signal([]);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      filterName: ['', [Validators.nullValidator]],
      filterStatus: [''],
    });

    this.statusFilter.set([
      { label: 'Todos', value: '' },
      { label: 'Ativos', value: 'true' },
      { label: 'Inativos', value: 'false' },
    ]);
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }
}
