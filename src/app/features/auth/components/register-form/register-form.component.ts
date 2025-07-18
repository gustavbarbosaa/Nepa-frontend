import { RouterLink } from '@angular/router';
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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';
import { validateEqualPasswords } from '@shared/validators/validateEqualPasswords';
import { ToastService } from '@core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { RegisterUserService } from '@core/services/register-user/register-user.service';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputFormComponent,
    SelectFormComponent,
    RouterLink,
    ToastModule,
    RippleModule,
  ],
  providers: [ToastService, MessageService],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;
  private formBuilder = inject(NonNullableFormBuilder);
  private readonly registerUserService = inject(RegisterUserService);
  readonly toastService = inject(ToastService);

  typesUser: WritableSignal<{ label: string; value: string }[]> = signal([]);
  courses: WritableSignal<{ label: string; value: string }[]> = signal([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        tipo: ['', Validators.required],
        nome: ['', [Validators.required, Validators.minLength(3)]],
        matricula: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmar_senha: ['', [Validators.required, Validators.minLength(6)]],
        telefone: ['', [Validators.required, Validators.minLength(11)]],
        curso_id: ['', Validators.required],
      },
      { validators: validateEqualPasswords }
    );

    this.typesUser.set([
      { label: 'Selecione o tipo de usuário', value: '' },
      { label: 'Professor', value: 'professor' },
      { label: 'Aluno', value: 'aluno' },
    ]);

    this.courses.set([
      { label: 'Selecione um curso', value: '' },
      {
        label: 'Ciência da Computação',
        value: '781aa5fa-0152-4f80-a7b9-34d26f3ad480',
      },
    ]);
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  register(): void {
    if (this.form.invalid) {
      this.toastService.showWarn(
        'Preencha todos os campos obrigatórios',
        'Alerta'
      );
      return;
    }

    this.loading.set(true);

    this.registerUserService.register(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.toastService.showSuccess('Usuário cadastrado com sucesso!');
        this.form.reset();
      },
      error: error => {
        this.loading.set(false);
        console.error('Erro ao cadastrar usuário:', error.error);
        const errors = error?.error?.errors?.json;
        if (errors) {
          for (const campo in errors) {
            const mensagens = errors[campo];
            mensagens.forEach((mensagem: string) => {
              const formatCampo = campo
                .replace('_', ' ')
                .replace(/\b\w/g, letra => letra.toUpperCase());

              this.toastService.showError(
                `${formatCampo}: ${mensagem}`,
                'Erro de Validação'
              );
            });
          }
        } else {
          this.toastService.showError('Erro ao cadastrar usuário', 'Erro');
        }
      },
      complete: () => this.loading.set(false),
    });
  }
}
