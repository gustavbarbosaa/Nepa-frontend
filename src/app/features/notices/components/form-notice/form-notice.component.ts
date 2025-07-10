import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '@core/services/toast/toast.service';
import { NoticeService } from '@features/notices/services/notice/notice.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-form-notice',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    InputFormComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form-notice.component.html',
  styleUrl: './form-notice.component.css',
  providers: [ToastService, MessageService, TextareaModule],
})
export class FormNoticeComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);
  toastService = inject(ToastService);
  noticeService = inject(NoticeService);

  successRegister = output<void>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastService.showWarn(
        'Verifique se os campos estão preenchidos!',
        'Alerta'
      );
      return;
    }

    this.noticeService.post(this.form.value).subscribe({
      next: () => {
        this.toastService.showSuccess(
          'Edital cadastrado com sucesso!',
          'Sucesso!'
        );

        this.form.reset();
        this.successRegister.emit();
      },
      error: error => {
        this.toastService.showError('Houve um erro inesperado!', 'Ops!');
        console.error(error.error.message);
      },
    });
  }
}
