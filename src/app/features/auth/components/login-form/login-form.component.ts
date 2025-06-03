import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Checkbox } from 'primeng/checkbox';

import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  imports: [
    InputFormComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    Checkbox,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);
  messageService = inject(MessageService);

  remember: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false, [Validators.required]],
    });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
