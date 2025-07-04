import { CommonModule } from '@angular/common';
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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-form-notice',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    InputFormComponent,
    SelectFormComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FileUpload,
  ],
  templateUrl: './form-notice.component.html',
  styleUrl: './form-notice.component.css',
  providers: [MessageService],
})
export class FormNoticeComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);
  messageService = inject(MessageService);
  uploadedFiles: any[] = [];

  admins: WritableSignal<{ label: string; value: string }[]> = signal([]);

  onUpload(event: FileUploadEvent): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      admin_id: ['', [Validators.required]],
      arquivo: [null, Validators.required],
    });

    this.admins.set([
      { label: 'Selecione um administrador', value: '' },
      {
        label: 'Exemplo',
        value: '781aa5fa-0152-4f80-a7b9-34d26f3ad480',
      },
    ]);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    this.form.patchValue({ arquivo: input.files[0] });
    this.form.get('arquivo')?.updateValueAndValidity();
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }

  onSubmit(): void {}
}
