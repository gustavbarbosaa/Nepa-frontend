import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SelectFormComponent } from '@shared/components/select-form/select-form.component';

@Component({
  selector: 'app-header-control',
  imports: [SelectFormComponent, ButtonComponent],
  templateUrl: './header-control.component.html',
  styleUrl: './header-control.component.css',
})
export class HeaderControlComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);

  form!: FormGroup;
  options = signal<{ label: string; value: string }[]>([]);
  loading = signal<boolean>(false);

  constructor() {
    this.options.set([
      { label: 'Selecione um ano', value: '' },
      { label: '2024', value: '2024' },
      { label: '2025', value: '2025' },
    ]);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      ano: ['', [Validators.required]],
    });
  }

  getControl<T = string>(controlName: string): FormControl<T> {
    return this.form.get(controlName) as FormControl<T>;
  }
}
