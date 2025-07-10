import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '@core/services/toast/toast.service';
import { NoticeSignalService } from '@features/notices/services/notice-signal/notice-signal.service';
import { NoticeService } from '@features/notices/services/notice/notice.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { iNoticeResponse } from '@shared/models/notice.model';

@Component({
  selector: 'app-insert-file',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    InputFormComponent,
    ButtonComponent,
    FileUpload,
  ],
  templateUrl: './insert-file.component.html',
  styleUrl: './insert-file.component.css',
  providers: [ToastService, MessageService],
})
export class InsertFileComponent implements OnInit, AfterViewChecked {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);
  toastService = inject(ToastService);
  noticeService = inject(NoticeService);
  noticeSignalService = inject(NoticeSignalService);

  editalId = input<string>();
  editalData = input<iNoticeResponse | null>(null);
  successEdit = output<void>();
  loading = signal<boolean>(false);
  uploadedFile: File | null = null;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      arquivo: [null, [Validators.required]],
    });
  }

  ngAfterViewChecked(): void {
    this.form.patchValue({
      nome: this.editalData()?.nome,
      descricao: this.editalData()?.descricao,
    });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  onSelect(event: FileSelectEvent): void {
    this.uploadedFile = event.files[0];

    this.toastService.showInfo('Arquivo carregado com sucesso!', 'info');
  }

  insertFile(): void {
    if (!this.uploadedFile) {
      this.toastService.showWarn('Insira o arquivo!', 'Alerta');
      return;
    }

    this.loading.set(true);
    const formData = new FormData();
    formData.append('arquivo', this.uploadedFile);

    this.noticeService.insertFile(this.editalData()!.id, formData).subscribe({
      next: () => {
        this.toastService.showSuccess(
          'Arquivo inserido com sucesso!',
          'Sucesso!'
        );

        this.loading.set(false);
        this.form.reset();
        this.successEdit.emit();
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
