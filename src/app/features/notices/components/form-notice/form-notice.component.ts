import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-notice',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-notice.component.html',
  styleUrl: './form-notice.component.css',
})
export class FormNoticeComponent implements OnInit {
  form!: FormGroup;
  formBuilder = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      admin_id: ['', [Validators.required]],
      arquivo: [null, Validators.required],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files && input.files.length < 0) return;

    this.form.patchValue({ arquivo: input.files[0] });
    this.form.get('arquivo')?.updateValueAndValidity();
  }
}
