import { RouterLink } from '@angular/router';
import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
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
import { RegisterStudentService } from '@core/services/register-user/register-student.service';
import { RegisterTeacherService } from '@core/services/register-user/register-teacher.service';
import { validateEqualPasswords } from '@shared/validators/validateEqualPasswords';
import { iRegisterUserRequest } from '@shared/models/register-user.model';
import { ToastService } from '@core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

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
  private readonly registerStudentService = inject(RegisterStudentService);
  private readonly registerTeacherService = inject(RegisterTeacherService);
  readonly toastService = inject(ToastService);

  typesUser: WritableSignal<{ label: string; value: string }[]> = signal([]);
  courses: WritableSignal<{ label: string; value: string }[]> = signal([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        tipoUsuario: ['', Validators.required],
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
        confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
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

  registerForType(
    userType: Signal<string>,
    registerData: iRegisterUserRequest
  ): void {
    if (userType() !== 'professor') {
      this.registerStudentService.register(registerData).subscribe({
        next: () => {
          this.loading.set(false);
          this.toastService.showSuccess('Aluno cadastrado com sucesso!');
          this.form.reset();
        },
        error: error => {
          this.loading.set(false);

          console.error('Erro ao cadastrar aluno:', error);
          this.toastService.showError('Erro ao cadastrar aluno', 'Erro');
        },

        complete: () => this.loading.set(false),
      });
      return;
    }

    this.registerTeacherService.register(registerData).subscribe({
      next: () => {
        this.loading.set(false);
        this.toastService.showSuccess('Aluno cadastrado com sucesso!');
        this.form.reset();
      },
      error: error => {
        this.loading.set(false);
        console.error('Erro ao cadastrar aluno:', error);
        this.toastService.showError('Erro ao cadastrar aluno', 'Erro');
      },
      complete: () => this.loading.set(false),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.showWarn(
        'Preencha todos os campos obrigatórios',
        'Alerta'
      );
      return;
    }

    this.loading.set(true);

    const { typeUserForm, ...userRequest } = this.form.value;
    const userType: Signal<string> = computed(() => typeUserForm);
    const registerData: iRegisterUserRequest = {
      nome: userRequest.nome,
      matricula: userRequest.matricula,
      email: userRequest.email,
      senha: userRequest.senha,
      telefone: userRequest.telefone,
      curso_id: userRequest.curso_id,
    };

    this.registerForType(userType, registerData);
  }
}
