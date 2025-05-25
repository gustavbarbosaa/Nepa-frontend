import { ButtonComponent } from './../../../../shared/components/button/button.component';
import { Component, inject, OnInit } from '@angular/core';
import { InputFormComponent } from '../input-form/input-form.component';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login-form',
  imports: [
    InputFormComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
