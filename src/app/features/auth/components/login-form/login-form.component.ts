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
import { AuthService } from '@core/services/auth/auth.service';
import { iLogin } from '@shared/models/login.model';
import { ToastService } from '@core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

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
    ToastModule,
    RippleModule,
  ],
  providers: [ToastService, MessageService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  toastService = inject(ToastService);

  remember: WritableSignal<boolean> = signal(false);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });

    this.checkUserRememberedLogin();
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  rememberLoginInLocalStorage(): void {
    const rememberChecked = this.form.get('remember')?.value;
    const login = this.getControl<string>('login').value;

    if (!rememberChecked) {
      localStorage.removeItem('userLogin');
      return;
    }

    localStorage.setItem('userLogin', login);
  }

  checkUserRememberedLogin(): void {
    const rememberedLogin = localStorage.getItem('userLogin');

    if (rememberedLogin) {
      this.getControl<string>('login').setValue(rememberedLogin);
      this.form.get('remember')?.setValue(true, { emitEvent: false });
      this.remember.set(true);
    }

    this.form.get('remember')?.valueChanges.subscribe(value => {
      this.remember.set(value);
      this.rememberLoginInLocalStorage();
    });

    this.form.get('login')?.valueChanges.subscribe(() => {
      if (this.form.get('remember')?.value) {
        this.rememberLoginInLocalStorage();
      }
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);

    const { ...userRequest } = this.form.value;
    const loginData: iLogin = {
      login: userRequest.login,
      senha: userRequest.senha,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        this.loading.set(false);
        this.toastService.showSuccess('Login realizado com sucesso!');
      },
      error: error => {
        this.loading.set(false);
        this.toastService.showError(
          error.message || 'Erro ao realizar login.',
          'Erro'
        );
      },
      complete: () => this.loading.set(false),
    });
  }
}
