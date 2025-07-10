import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output, signal } from '@angular/core';
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
import { NoticeSignalService } from '@features/notices/services/notice-signal/notice-signal.service';

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
  noticeSignalService = inject(NoticeSignalService);

  successRegister = output<void>();
  loading = signal<boolean>(false);

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

    this.loading.set(true);

    this.noticeService.post(this.form.value).subscribe({
      next: () => {
        this.toastService.showSuccess(
          'Edital cadastrado com sucesso!',
          'Sucesso!'
        );

        this.loading.set(false);
        this.form.reset();
        this.successRegister.emit();
        this.noticeSignalService.triggerRefresh();
      },
      error: error => {
        this.loading.set(false);
        this.toastService.showError('Houve um erro inesperado!', 'Ops!');
        console.error(error.error.message);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
