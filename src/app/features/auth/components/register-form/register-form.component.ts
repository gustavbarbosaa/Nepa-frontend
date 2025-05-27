import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputFormComponent,
    SelectFormComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);
  courses: WritableSignal<{ label: string; value: string }[]> = signal([]);

  ngOnInit(): void {
    this.form = this.formBuilder.group({});

    this.courses.set([
      { label: 'Selecione um curso', value: '' },
      { label: 'Ciência da Computação', value: 'ciencia_da_computacao' },
      { label: 'Direito', value: 'direito' },
      { label: 'Educação Física', value: 'educacao_fisica' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Filosofia', value: 'filosofia' },
    ]);
  }

  onSubmit(): void {}
}
