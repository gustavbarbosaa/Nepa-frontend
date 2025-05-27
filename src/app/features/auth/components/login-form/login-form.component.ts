import { ButtonComponent } from './../../../../shared/components/button/button.component';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { InputFormComponent } from '../input-form/input-form.component';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    InputFormComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    Checkbox,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);

  remember: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false, [Validators.required]],
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
